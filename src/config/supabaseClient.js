import { createClient } from "@supabase/supabase-js";

const SUPABASE_KEY =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZta3pwbHRsanZ4Y3BhbGhkaHNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyMzgzNzUsImV4cCI6MjAzMTgxNDM3NX0.CQNEKqlwtJemkxhlraMUXEeu7WUZPxUio2Y8jKSMiX0";

const supabaseUrl = "https://fmkzpltljvxcpalhdhsa.supabase.co";
const supabaseKey = SUPABASE_KEY;
console.log(supabaseKey);
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
