const Repo = ({repos}) => {
    return <ul>
        <li>
            {repos.map((item,index) => {
                return (<p key={index}>{item.name}</p>)
            })}
        </li>
    </ul>
}

export default Repo