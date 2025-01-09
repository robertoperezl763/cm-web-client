'use server';

import { serviceUrl } from "../config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isSignedIn, useAuth } from "../helpers/auth";
// import { DeleteFileFromS3, UploadFileToS3 } from "../utils/s3";
// import { resolve } from "path";
// import { arrayBuffer } from "stream/consumers";
// import { toBool } from "../helpers/helperFunctions";

const cookieStore = cookies();

export async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms) );
}

export const login = async (prevState: any, formData: FormData) => {
    const reqOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: {
                email: formData.get('email')?.toString(),
                password: formData.get('password')?.toString(),
            },
        }),
    };

    let req;

    try  {
        req = await fetch(`${serviceUrl}/users/login`, reqOptions);
    } catch (error: any) {
        if (error.message) {
            return {
                message: error.message
            };
        }
        return {
            message: error.toString()
        }
    }

    const response = await req.json();
    // console.log('LOGIN RESPONSE:')
    // console.log(response);
    if (req.status !== 200) {
        return {
            message: response.message
        };
    }

    const thirdyDays = 24 * 60 * 60 * 1000 * 30;
    const expirationTimestamp = Date.now() + thirdyDays

    cookieStore.set('token', response.token, { expires: expirationTimestamp });
    cookieStore.set('user', JSON.stringify(response.user), { expires: expirationTimestamp });

    // console.log('COOKIES SHOULD BE SAVED');
    await delay(200);

    if(isSignedIn()){
        // console.log('I AM LOGGED IN');
    } else {
        // console.log('COOKIES ERROR????')
    }
    // console.log(cookieStore.get('token'))
    // console.log(cookieStore.get('user'))
    
    redirect('/collections');

};

export const logout = () => {
    cookieStore.delete('token');
    cookieStore.delete('user');
    // console.log('cookies should be deleted')
    if(isSignedIn()){
        // console.log('not signed out successfully???');
    }

    redirect('/');
};

export const signup = async (prevState: any, formData: FormData) => {
    const password = formData.get('password');
    const repeatPassword = formData.get('repeat-password');

    if (password !== repeatPassword) {
        return {
            message: 'The password does not match.'
        }
    }
    
    const reqOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: {
                email: formData.get('email')?.toString(),
                password: formData.get('password')?.toString(),
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
            },
        }),
    };

    let req;

    try  {
        req = await fetch(`${serviceUrl}/users`, reqOptions);
    } catch (error: any) {
        if (error.message) {
            return {
                message: error.message
            };
        }
        return {
            message: error.toString()
        }
    }

    const response = await req.json();


    if (req.status !== 200) {
        if (
            response.statusCode
            && response.statusCode == 500
            && response.message.includes('unique constraint')
        ) {
            return {
                message: 'A User already exists with this email.'
            }
        }

        if (
            response[0]
            && response[0].constraints
            && response[0].constraints.matches
        ) {
            return {
                message: response[0].constraints.matches
            };
        }

        return {
            message: response.message
        };
    }

    redirect('/login')
};



export const takeMe = (href: string) => {
    'use server'
    // console.log('this is working')
    redirect(`/${href}`);
};



// export const collectionSubmit = async (prevState: any, formData: FormData) => {
//     // console.log(formData);
//     const [user, token] = useAuth();

//     const hasAuthor = formData.get('hasAuthor') === 'true';
//     const hasSeries = formData.get('hasSeries') === 'true';
//     const isPublic = formData.get('isPublic') === 'true';

//     let imageUID = crypto.randomUUID();
//     const imageFile = formData.get('imageUpload');

//     if (imageFile && imageFile instanceof File) {

//         if(imageFile.size > 0){
//             try{
//                 console.log('GOING TO RUN UPLOAD IMAGE');
//                 UploadFileToS3(imageUID, imageFile);
//             } catch(error: any){
//                 console.log('UPLOAD IMAGE----------------- FAILED')
//                 imageUID = '';
//             }
//         }
//     }
        

//     const reqOptions = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//             collection: {
//                 name: formData.get('collection-name')?.toString(),
//                 description: formData.get('collection-description')?.toString(),
//                 imageURL: "",
//                 imageUID: imageUID,
//                 hasAuthor: hasAuthor,
//                 hasSeries: hasSeries,
//                 isPublic: isPublic,
//             },
//         }),
//     };

//     let req;

//     console.log(`the image id should be: ${imageUID}`);

//     try  {
//         req = await fetch(`${serviceUrl}/collections`, reqOptions);
//     } catch (error: any) {
//         if (error.message) {
//             return {
//                 message: error.message
//             };
//         }
//         return {
//             message: error.toString()
//         }
//     }
    
//     const response = await req.json();

//     console.log(response);
//     const newCol = response.collection.id;

//     redirect(`/collections/${newCol}`);


// };

// aaaaaaaaaaaaaaaaa

// export const editSubmitCollection = async ( prevState: any, formData: FormData) => {
//     // console.log(formData);
//     const [user, token] = useAuth();
    
    

//     let imageUID = formData.get("currentImageUID")?.toString();
//     const imageFile = formData.get('imageUpload');
//     const hasImageChanged = toBool(formData.get('imageChanged')?.toString());    


//     if(imageFile instanceof File && imageFile.size > 0) {
//         console.log(imageFile?.size)
//         if(!imageUID){
//             imageUID = crypto.randomUUID();
//         }
//     } else if (imageFile instanceof File && imageFile.size === 0) {
//         if(imageUID && hasImageChanged){
//             DeleteFileFromS3(imageUID);
//             imageUID='';
//         }
//     }


//     const hasAuthor = toBool(formData.get('collectionHasAuthor')?.toString());
//     const hasSeries = toBool(formData.get('collectionHasSeries')?.toString());
//     const isPublic = toBool(formData.get('collectionIsPublic')?.toString());




//     if (imageFile && imageFile instanceof File && imageUID && hasImageChanged) {
//         try{
//             UploadFileToS3(imageUID, imageFile);
//         } catch(error: any){
//             imageUID = '';
//         }
//     }
        
//     console.log(`imageUID right before upload is: ${imageUID}`)
//     const reqOptions = {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//             collection: {
//                 id: formData.get('collectionID')?.toString(),
//                 name: formData.get('collectionName')?.toString(),
//                 description: formData.get('collectionDescription')?.toString(),
//                 imageUID: imageUID,
//                 hasAuthor: hasAuthor,
//                 hasSeries: hasSeries,
//                 isPublic: isPublic,
//             },
//         }),
//     };

//     let req;

//     console.log(`the image id should be: ${imageUID}`);

//     try  {
//         req = await fetch(`${serviceUrl}/collections`, reqOptions);
//     } catch (error: any) {
//         if (error.message) {
//             return {
//                 message: error.message
//             };
//         }
//         return {
//             message: error.toString()
//         }
//     }
    
//     const response = await req.json();

//     console.log(response);
//     // const newCol = response.collection.id;

//     // redirect(`/collections/${newCol}`);


// };



// export const collectionUpdate = async (
//     collectionId: number,
//     name?: string,
//     description? : string,
//     hasAuthor?: boolean,
//     hasSeries?: boolean,
//     isPublic?: boolean,
//     imageUrl?: string,) => {

//     const [user, token] = useAuth();


//     // // const collectionId = formData.get('collectionID');
//     // console.log(collectionId);

//     const reqOptions = {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//             collection: {
//                 id: collectionId,
//                 name: name,
//                 description: description,
//                 hasAuthor: hasAuthor,
//                 hasSeries: hasSeries,
//                 isPublic: isPublic,
//                 imageURL: imageUrl,
//             },
//         }),
//     };

//     let req;

//     try  {
//         req = await fetch(`${serviceUrl}/collections`, reqOptions);
//     } catch (error: any) {
//         if (error.message) {
//             return {
//                 message: error.message
//             };
//         }
//         return {
//             message: error.toString()
//         }
//     }
    
//     const response = await req.json();

//     console.log(response);

    
//     redirect(`/collections/${collectionId.toString()}`);


// };


// export const itemSubmit = async (
//     collectionId: string,
//     name: string,
//     description? : string,
//     author?: string,
//     series?: string,
//     imageURL?: string,
//     imageUID?: string
//     ) => {

//     const [user, token] = useAuth();


//     // // const collectionId = formData.get('collectionID');
//     // console.log(collectionId);


//     const reqOptions = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//             item: {
//                 name: name,
//                 description: description,
//                 imageURL: imageURL,
//                 imageUID: imageUID,
//                 author: author,
//                 series: series,
//             },
//         }),
//     };

//     let req;

//     try  {
//         req = await fetch(`${serviceUrl}/items/${collectionId}`, reqOptions);
//     } catch (error: any) {
//         if (error.message) {
//             return {
//                 message: error.message
//             };
//         }
//         return {
//             message: error.toString()
//         }
//     }
    
//     const response = await req.json();

//     console.log(response);

    
//     redirect(`/collections/${collectionId}`);

//     return{
//         message: ''
//     }


// };


// export const itemUpdate = async (
//     collectionId: string,
//     itemId: number,
//     name?: string,
//     description? : string,
//     author?: string,
//     series?: string,
//     imageUrl?: string,
//     imageUID?: string
//     ) => {

//     const [user, token] = useAuth();


//     const reqOptions = {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//             item: {
//                 id: itemId,
//                 name: name,
//                 description: description,
//                 imageURL: imageUrl,
//                 imageUID: imageUID,
//                 author: author,
//                 series: series,
//             },
//         }),
//     };

//     let req;

//     try  {
//         req = await fetch(`${serviceUrl}/items/`, reqOptions);
//     } catch (error: any) {
//         if (error.message) {
//             return {
//                 message: error.message
//             };
//         }
//         return {
//             message: error.toString()
//         }
//     }
    
//     const response = await req.json();

//     console.log(response);

    
//     redirect(`/collections/${collectionId}`);


// };






