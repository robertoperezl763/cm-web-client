import ImageUpload from "@/src/components/imageUpload";

const Error = () => (
    <div>
    <div>
        <h1 className="text-xl font-bold">Access Denied!</h1>
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
        <div>
            
            <p>TESTING THIS HERE!!</p>
            <ImageUpload name="my-image-upload" isRequired={true} formName="my-form"/>
        </div>
    
    </div>
)

export default Error;