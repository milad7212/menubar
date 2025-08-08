import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { MenuPageClient } from "./MenuPageClient"
import { customerThemes } from "@/lib/themes"

type Props = {
  params: {
    slug: string
  }
}

// This function can be used to generate dynamic metadata for the page
export async function generateMetadata({ params }: Props) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: profile } = await supabase
    .from("profiles")
    .select("cafe_name")
    .eq("slug", params.slug)
    .single()

  return {
    title: `${profile?.cafe_name || "منو"} | کافه ساز`,
  }
}

export default async function MenuPage({ params }: Props) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // Fetch profile data based on slug
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("slug", params.slug)
    .single()

  if (profileError || !profile) {
    notFound()
  }

  // Fetch menus, categories, and items for the profile
  const { data: menus, error: menusError } = await supabase
    .from("menus")
    .select("*, categories(*, items(*))")
    .eq("profile_id", profile.id)

  if (menusError) {
    // Handle error appropriately
    return <div>خطا در بارگذاری منو.</div>
  }

  const cafeData = {
    info: profile,
    menus: menus,
  }

  return <MenuPageClient cafeData={cafeData} customerThemes={customerThemes} />
}
