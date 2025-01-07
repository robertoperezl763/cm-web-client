interface DialogInputProps extends React.HTMLProps<HTMLTextAreaElement> {extraClassName?: string}

const DialogTextArea = (props: DialogInputProps) => {
    const classNameBase = 'w-full h-32 p-4 text-base text-black border border-solid border-grey1 rounded-xl bg-grey1 appearance-none m-0 placeholder:text-grey5'
    let className = props.extraClassName ? props.extraClassName + classNameBase : classNameBase
    return(
        <div className="relative">
            <textarea {...props}
            className={className}
            />
        </div>
    )

};

export default DialogTextArea;