-- Profiles Table
-- This table stores public profile information for each user.
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  slug TEXT UNIQUE,
  cafe_name TEXT,
  description TEXT,
  address TEXT,
  phone TEXT,
  logo_url TEXT,
  selected_theme TEXT DEFAULT 'modern',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT slug_validation CHECK (slug ~ '^[a-z0-9-]+$')
);

-- Function to create a public profile for each new user.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, cafe_name, slug)
  VALUES (new.id, 'کافه من', 'cafe-' || substr(new.id::text, 1, 8));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function when a new user signs up.
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Menus Table
-- Each user (profile) can have multiple menus.
CREATE TABLE menus (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  time_slots JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories Table
-- Each menu can have multiple categories.
CREATE TABLE categories (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  menu_id BIGINT NOT NULL REFERENCES public.menus(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  "order" INTEGER,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Items Table
-- Each category can have multiple items.
CREATE TABLE items (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category_id BIGINT NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  image_url TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  is_popular BOOLEAN DEFAULT FALSE,
  preparation_time TEXT,
  calories INTEGER,
  ingredients TEXT[],
  "order" INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ROW LEVEL SECURITY (RLS) POLICIES --

-- Enable RLS for all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view their own profile." ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile." ON public.profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Menus Policies
CREATE POLICY "Users can view their own menus." ON public.menus
  FOR SELECT USING (auth.uid() = profile_id);
CREATE POLICY "Users can insert their own menus." ON public.menus
  FOR INSERT WITH CHECK (auth.uid() = profile_id);
CREATE POLICY "Users can update their own menus." ON public.menus
  FOR UPDATE USING (auth.uid() = profile_id) WITH CHECK (auth.uid() = profile_id);
CREATE POLICY "Users can delete their own menus." ON public.menus
  FOR DELETE USING (auth.uid() = profile_id);

-- Categories Policies
CREATE POLICY "Users can view categories of their own menus." ON public.categories
  FOR SELECT USING (auth.uid() = (
    SELECT profile_id FROM public.menus WHERE id = menu_id
  ));
CREATE POLICY "Users can insert categories into their own menus." ON public.categories
  FOR INSERT WITH CHECK (auth.uid() = (
    SELECT profile_id FROM public.menus WHERE id = menu_id
  ));
CREATE POLICY "Users can update categories in their own menus." ON public.categories
  FOR UPDATE USING (auth.uid() = (
    SELECT profile_id FROM public.menus WHERE id = menu_id
  )) WITH CHECK (auth.uid() = (
    SELECT profile_id FROM public.menus WHERE id = menu_id
  ));
CREATE POLICY "Users can delete categories from their own menus." ON public.categories
  FOR DELETE USING (auth.uid() = (
    SELECT profile_id FROM public.menus WHERE id = menu_id
  ));

-- Items Policies
CREATE POLICY "Users can view items in their own categories." ON public.items
  FOR SELECT USING (auth.uid() = (
    SELECT m.profile_id FROM public.menus m JOIN public.categories c ON m.id = c.menu_id WHERE c.id = category_id
  ));
CREATE POLICY "Users can insert items into their own categories." ON public.items
  FOR INSERT WITH CHECK (auth.uid() = (
    SELECT m.profile_id FROM public.menus m JOIN public.categories c ON m.id = c.menu_id WHERE c.id = category_id
  ));
CREATE POLICY "Users can update items in their own categories." ON public.items
  FOR UPDATE USING (auth.uid() = (
    SELECT m.profile_id FROM public.menus m JOIN public.categories c ON m.id = c.menu_id WHERE c.id = category_id
  )) WITH CHECK (auth.uid() = (
    SELECT m.profile_id FROM public.menus m JOIN public.categories c ON m.id = c.menu_id WHERE c.id = category_id
  ));
CREATE POLICY "Users can delete items from their own categories." ON public.items
  FOR DELETE USING (auth.uid() = (
    SELECT m.profile_id FROM public.menus m JOIN public.categories c ON m.id = c.menu_id WHERE c.id = category_id
  ));
