import {LoginForm} from '@/features/auth/components/login-form'
import { requireUnauth } from '@/lib/auth-utils';
const Page =async()=>{
    await requireUnauth();// this prevent us to go back to login we logged in
     return (
        <div>
            <LoginForm/>
        </div>
     );
};

export default Page;