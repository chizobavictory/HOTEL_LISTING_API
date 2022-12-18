import supertest from "supertest";
import app from "../app";
import mongoose from "mongoose";

let token: string;
let ID: string;
// let authorId: string;
// let bookId: string;

const registerData = {
  "fullName": "Chizoba Victory",
  "email": "chizobavictory@gmail.com",
  "phoneNumber": "09034461883",
  "password": "1234",
  "confirm_password": "1234"
};

describe("Register and Login User", () => {
  it("creates a new user", async () => {
    const res = await supertest(app).post("/users/api/register").send(registerData);
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe("you have sucessfully created a User");
    // done()
  });

  test("login a user", async () => {
    const response = await supertest(app)
      .post("/users/login")
      .send({ email: registerData.email, password: registerData.password });
    token = response.body.token;
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User loggedin successfully");
  });
});

describe("hotel", () => {
  const hotelData = {
    "description": "Latest Hotel in Town",
    "image": "https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg",
    "address": "Montogromery",
    "price": 95000,
    "numOfBeds": 10,
    "numOfBaths": 20,
    "ratings": 5
  };

  test("create hotel", async () => {
    const response = await supertest(app)
      .post("/hotels/api/create")
      .set("auth", `Bearer ${token}`)
      .send(hotelData);
    // authorId = response.body.data.id;
    ID = response.body.data.id;
    console.log(response.body.message,ID, 'check if this is the id')
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("you have sucessfully created a hotel listing");
    // expect(response.body.data.author).toBe(hotelData.author);
  });

//   test("update an author", async () => {
//     const response = await supertest(app)
//       .put(`/author/${authorId}`)
//       .set("Authorization", `Bearer ${token}`)
//       .send(authorData);

//     expect(response.status).toBe(201);
//     expect(response.body.message).toBe("updates an author");
//     // expect(response.body.author.author).toMatch("Charis Claire");
//   });

//   test("delete an author", async () => {
//     const response = await supertest(app)
//       .delete(`/author/${authorId}`)
//       .set("Authorization", `Bearer ${token}`);
//     //   //console.log(response.body)
//     expect(response.status).toBe(201);
//     expect(response.body.message).toBe("Trashed!");
//   });
// });

// describe("books", () => {
//   let bookData = {
//     name: "Sunrise",
//     isPublished: true,
//     serialNumber: 3,
//   };

//   test("create a book", async () => {
//     const response = await supertest(app)
//       .post(`/author/${authorId}/book`)
//       .set("Authorization", `Bearer ${token}`)
//       .send(bookData);
//     bookId = response.body.data.id;
//     //console.log('ffdfdfdfdfd',bookId);

//     expect(response.status).toBe(201);
//   });

//   test("get all books by  author", async () => {
//     const response = await supertest(app)
//       .get(`/author/books/${authorId}/${0}`)
//       .set("Authorization", `Bearer ${token}`);
//     //console.log(`/author/books/${authorId}/${bookId}/${0}`);
//     // console.log(response.body.book.name);
//     expect(response.status).toBe(200);
//     // expect(response.body.data[0].author).toBe(200);
//   });
//   test("update a book", async () => {
//     bookData = {
//       name: "Sunset",
//       isPublished: false,
//       serialNumber: 9,
//     };
//     const response = await supertest(app)
//       .put(`/author/book/${bookId}`)
//       .set("Authorization", `Bearer ${token}`)
//       .send();
//     console.log(response.body, "dsdsdsdsd");
//     expect(response.status).toBe(201);
//     expect(response.body.message).toBe("updates a book");
//   });
//   test("delete a book", async () => {
//     const response = await supertest(app)
//       .delete(`/author/book/${bookId}`)
//       .set("Authorization", `Bearer ${token}`);
//     expect(response.status).toBe(200);
//     expect(response.body.message).toBe(`Book with the id ${bookId} has been trashed`);
//   });
// });

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
});
})
// deletedata()
