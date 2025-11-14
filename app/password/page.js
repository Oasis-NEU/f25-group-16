import {supabase} from '../../lib/supabaseClient'; 

export default function Password() {
  return (
    <div>
      <h1>Reset Password Page</h1>
    </div>
  );
}


const { data, error } = await supabase
  .from('characters')
  .select()