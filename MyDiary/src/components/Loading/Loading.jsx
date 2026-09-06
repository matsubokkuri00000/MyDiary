import "../../styles/loading.css"

const Loading = () => {
    return (
        <div className="loading">
            <div className="loading-spinner"></div>
            <p>読み込み中...</p>
        </div>
    );
}

export default Loading;