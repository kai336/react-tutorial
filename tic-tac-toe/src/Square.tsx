import './style.css';

export type SquareProps = {
    value: string | null;
    onClick: () => void;
}

function Square({value, onClick}: SquareProps): JSX.Element {
    return (
        <button className='square' onClick={onClick}>
            {value}
        </button>
    );
};

export default Square;