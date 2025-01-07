/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, _) => ({
        ...config,
        watchOptions: {
          ...config.watchOptions,
          poll: 800,
          aggregateTimeout: 300,
        },
      }),
      experimental: { serverComponentsExternalPackages: [ '@aws-sdk/client-s3', '@aws-sdk/s3-request-presigner' ] },


      // async redirects() {
      //   return[
      //     {
      //       source: '/',
      //       destination: '/home',
      //       permanent: false,
      //     },
      //   ]
      // }


};


export default nextConfig;
