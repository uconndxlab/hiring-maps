import { createClient } from '@supabase/supabase-js'

export default ({ $config: { SUPABASE_KEY, SUPABASE_URL } }, inject) => {
  inject('supabase', () => createClient(SUPABASE_URL, SUPABASE_KEY))
}
