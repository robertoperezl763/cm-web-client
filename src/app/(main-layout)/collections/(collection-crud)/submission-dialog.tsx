'use client';
import { Dialog} from "@robperezl/cm-ui";


type CollectionDialogProps = {
    id: string,
    children: React.ReactNode,
    title: string,
    open?: boolean,
    isOpen?: boolean,
    setIsOpen: React.EventHandler<any>,
    onKeyDown?: React.KeyboardEventHandler,

}

const SubmissionDialog = (props: CollectionDialogProps) => {
    
    

    function handleSubmit(e:any) { 
        e.preventDefault(); 
        // console.log('form was submitted!'); 
    };

    return (
        <Dialog isOpen={props.isOpen}
        hasCloseBtn={true}
        onClose={props.setIsOpen}
        onKeyDown={props.onKeyDown} 
        title={props.title}
        >
            {props.children}
        </Dialog>
    )

};

export default SubmissionDialog;