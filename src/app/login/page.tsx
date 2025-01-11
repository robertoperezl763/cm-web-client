'use client';

import { useFormState } from 'react-dom';
import {
    Label,
    Input, 
    Button
} from '@robperezl/cm-ui'
import { login } from '@/src/actions/user-actions';
import Link from 'next/link';
import StyledLink from '@/src/components/formattedLink';
import DialogInput from '@/src/components/dialogInput';

const initialState = {
    message: '',
}

const Login = () => {

    const [state, formAction] = useFormState(login, initialState)


    return (
        <div className='flex min-h-screen justify-center items-center'>
            <div className='w-96 mx-8'>
                <div className='w-full shadow-lg rounded-xl p-5 bg-white'>
                    <form action={formAction} className='flex flex-col gap-5'>
                        <div>
                            <Label htmlFor='email'>Email</Label>
                            <DialogInput autoFocus={true} required name='email' type='email' id='email' />
                        </div>
                        <div>
                            <Label htmlFor='password'>Password</Label>
                            <DialogInput autoFocus={true} required name='password' type='password' id='password' />
                        </div>

                        <p aria-live='polite' className='text-red5'>
                            {state?.message}
                        </p>
                        <div className='flex justify-between'>
                            <StyledLink href='/'>
                                <p>Cancel</p>
                            </StyledLink>
                            <Button className='self-end'>Sign In</Button>
                        </div>
                    </form>
                    <div className='mt-2'>
                        <Link href='/sign-up' className='text-blue5 hover:text-blue2'>New? Sign Up here!</Link>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Login;