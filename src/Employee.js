export const Employee = props => {
    const names = props.names;
     
    return (
    <ul>
        {names.map(name => <li key={name.sid}>{name.name} - {name.sid}</li>)}
    </ul>
    );
}