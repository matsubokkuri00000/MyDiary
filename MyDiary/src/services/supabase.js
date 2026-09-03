import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bkyietwkyslcntvrjync.supabase.co"
const supabaseKey = "sb_publishable_Li3jh_mQ5W7lT6EdPFMHjA_BgXUxp5z"

export const supabase = createClient(supabaseUrl, supabaseKey);