'use client';

import { signIn, signOut, getProviders, useSession } from 'next-auth/react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SignIn = () => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [providers, setProviders] = useState(null);
  const [signingIn, setSigningIn] = useState(false);
  console.log("signing : ", signingIn)

  useEffect(() => {
    (async () => {
      const response = await getProviders();
      setProviders(response);
    })();
  }, []);

  useEffect(() => {
    if (session?.user) router.push('/');
  });

  return (
    <div className="relative w-full ">
      {signingIn ? (
        <></>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => {
                  signIn(provider.id);
                  // router.push('/');
                  setSigningIn(true);
                }}
                className="mt-5 w-full outline_btn"
              >
                Continue with
                <Image
                  src={`/assets/icons/${provider.name}.png`}
                  alt="Google Logo"
                  width={20}
                  height={20}
                  className="ml-5"
                />
              </button>
            ))}
        </>
      )}
    </div>
  );
};

export default SignIn;
