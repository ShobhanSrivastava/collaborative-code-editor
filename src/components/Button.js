function Button({text, onClick}) {
    return (<>
        <button onClick={onClick} className="rounded bg-[#73F340] text-[#282a36] border-2 border-[#73F340] font-semibold p-1 mb-3"
        type="submit">{text}</button>
    </>);
}

export default Button;