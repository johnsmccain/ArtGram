const FormAction = ({
    handleSubmit,
    type = 'Button',
    action = 'submit',
    text
}: any) => {
    return (
        <>
            {
                type === 'Button' ?
                    <button
                        type={action}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        onSubmit={handleSubmit}
                    >

                        {text}
                    </button>
                    :
                    <></>
            }
        </>
    )
}

export default FormAction;