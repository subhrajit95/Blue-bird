import React from 'react';
export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookAuthor:"",
      bookName:"",
      read:"No",
      books: [],
    };
  } render() {
    let books = this.state.books;
    return (
      <div>
        <form className='bookForm' onSubmit={this.submitHandler}>
          <label for="bookName">Book Title</label>
          <input
            id="bookName"
            name="bookName"
            type="text"
            placeholder="Book title"
            maxLength="40"
            onChange={this.changeHandler}
            required
          />
          <label for="bookAuthor">Author</label>
          <input
            id="bookAuthor"
            name="bookAuthor"
            type="text"
            placeholder="Book Author"
            maxLength= "30"
            onChange={this.changeHandler}
            required
          />
          <label for="read">Read</label>
          <select 
            id="read"
            name="read"
            onChange={this.changeHandler}
            value={this.state.read}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <input id="submit" type="submit" value="ADD NEW BOOK" />
        </form>
        <table>
          <tr>
            <th>Book Name</th>
            <th>Book Author</th>
            <th>Finished (Yes/No)</th>
            <th colSpan = "2">Settings</th>
          </tr>
          {books.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.bookName}</td>
                <td>{item.bookAuthor}</td>
                <td>{item.read}</td>
                <td id="settings">
                  <buttons
                    onClick={() => {
                      item.read === "Yes"
                        ? (item.read = "No")
                        : (item.read = "Yes");
                    
                      this.saveLocal();
                      this.forceUpdate();
                    }}>
                      {item.read === "Yes" ? "Still reading" : "Finished"}
                    </buttons>
                    <button
                      onClick={() => {
                        this.removeBook(index)
                      }}>
                      Remove
                    </button>
                </td>
              </tr>
            )
          })}
        </table>
      </div>
    )
  }

  saveLocal = () => {
    localStorage.setItem("books", JSON.stringify(this.state.books))
  }
  
  
  componenetDidMount() {
    const books = localStorage.getItem("books")
    if (books) this.setState({ books: JSON.parse(books)})
  }

  removeBook = (index) => {
    const bookArr =[...this.state.books];
    if(booksArr){
      this.setState(
        {
          books: booksArr.filter((book, bookIndex) => {
            return bookIndex !== index;
          })
        },
        () => {
          localStorage.setItem("books", JSON.stringify(this.state.books))
        }
      )
    }
  }

  changeHandler=(event)=>{
    const nam = event.target.name;
    const val = event.target.value;
    this.setState({
      [nam]: val,
    })
  }

  submitHandler = (event) => {
    event.preventDefault();
    const bookNameVal = this.state.bookName;
    const bookAuthorVal = this.state.bookAuthor;
    const readVal = this.state.read;
    if(bookNameVal && bookAuthorVal) {
      this.setState(
        (prevState) => ({
          books: [
            ...prevState.books,
            {
              bookName: bookNameVal,
              bookAuthor: bookAuthorVal,
              read: readVal
            }
          ]
        }),
        () => {
          localStorage.setItem("books", JSON.stringify(this.state.books))
        }
      )
    }
  }
}