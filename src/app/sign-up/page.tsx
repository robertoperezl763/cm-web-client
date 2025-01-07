'use client';

import { useFormState } from 'react-dom';
import {
    Label,
    Input, 
    Button
} from '@robperezl/cm-ui'
import { signup } from '@/src/actions/user-actions';
import StyledLink from '@/src/components/formattedLink';
import Link from 'next/link';

const initialState = {
    message: '',
}

const SignUp = () => {

    const [state, formAction] = useFormState(signup, initialState)


    return (
        <div className='flex min-h-screen justify-center items-center bg-grey1'>
            <div className='w-min shadow-lg rounded-xl p-5 bg-white'>
                <form action={formAction} className='flex flex-col gap-5'>
                    <div>
                        <Label htmlFor='email'>Email</Label>
                        <Input autoFocus={true} required name='email' type='email' id='email' />
                    </div>
                    <div>
                        <Label htmlFor='firstName'>First Name</Label>
                        <Input autoFocus={true} required name='firstName' type='firstName' id='firstName' />
                    </div>
                    <div>
                        <Label htmlFor='lastName'>Last Name</Label>
                        <Input autoFocus={true} required name='lastName' type='lastName' id='lastName' />
                    </div>
                    <div>
                        <Label htmlFor='password'>Password</Label>
                        <Input autoFocus={true} required name='password' type='password' id='password' />
                    </div>
                    <div>
                        <Label htmlFor='repeat-password'>Repeat Password</Label>
                        <Input autoFocus={true} required name='repeat-password' type='password' id='repeat-password' />
                    </div>

                    <p aria-live='polite' className='text-red5'>
                        {state?.message}
                    </p>
                    <div className='flex justify-between'>
                        <StyledLink href='/'>Cancel</StyledLink>
                        <Button className='self-end'>Sign up</Button>
                    </div>
                </form>
                <div className='mt-2'>
                    <Link href='/login' className='text-blue5 hover:text-blue2'>Already have an account? Sign In</Link>
                </div>
            </div>

        </div>
    );
}

export default SignUp;