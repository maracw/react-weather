import { getLocation } from "./utilities/api";

function App () {
    const zip='89511';

    const onClickHandler = () => {
        getLocation(zip);
    }
    return (
        <button onClick={onClickHandler}>Test call</button>
    );
}

export default App;