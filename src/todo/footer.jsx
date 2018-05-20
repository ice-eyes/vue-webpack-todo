import '../assets/styles/footer.styl'

export default {
    data() {
        return {
            author: 'skier'
        }
    },
    render() {
        return (
            <div id="footer">
                <span>author {this.author}</span>
            </div>
        )
    }
}