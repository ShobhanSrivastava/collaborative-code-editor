function SecondaryButton({text, onClick}) {
    return (
    <>
        <button onClick={onClick} className="rounded bg-white text-[#282a36] border-2 border-white font-semibold p-1 mb-3 hover:bg-white"
        type="submit">{text}</button>
    </>);
}

export default SecondaryButton;