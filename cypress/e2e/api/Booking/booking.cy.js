let headers = {}
describe("Test Suite - Booking API Testing v1", () => {
    beforeEach(() => {
        cy.request({
            method: "POST",
            url: "/auth",
            headers: { "Content-type": "application/json" },
            body: {
                username: "admin",
                password: "password123",
            },
        }).as("token");
    });
    it("1 - GET all booking ids", () => {
        cy.request({
            method: "GET",
            url: "/booking",
            headers: { "Content-Type": "application/json" },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an("array");
            expect(response.body).to.have.lengthOf.at.least(1);
            expect(response.body[0]).to.have.property("bookingid");
        });
    });

    it("2 - GET booking id by firstname", () => {
        cy.request({
            method: "GET",
            url: "/booking",
            qs: { firstName: "test" },
            headers: { "Content-Type": "application/json" },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an("array");
        });
    });
    it("3 - GET booking by checkin and checkout", () => {
        cy.request({
            method: "GET",
            url: "/booking",
            qs: { checkin: "2024-01-05", checkout: "2024-02-05" },
            headers: { "Content-Type": "application/json" },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an("array");
        });
    });
    it("4 - GET booking by id", () => {
        cy.request({
            method: "GET",
            url: "/booking/1",
            headers: { Accept: "application/json" },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.headers).to.have.property(
                "content-type",
                "application/json; charset=utf-8"
            );
            expect(response.body).to.be.an("object");
            expect(response.body)
                .to.have.property("firstname")
                .and.to.be.a("string");
            expect(response.body)
                .to.have.property("lastname")
                .and.to.be.a("string");
            expect(response.body)
                .to.have.property("totalprice")
                .and.to.be.a("number");
            expect(response.body)
                .to.have.property("depositpaid")
                .and.to.be.a("boolean");
            expect(response.body)
                .to.have.property("bookingdates")
                .and.to.be.an("object");
            expect(response.body.bookingdates)
                .to.have.property("checkin")
                .and.to.be.a("string");
            expect(response.body.bookingdates)
                .to.have.property("checkout")
                .and.to.be.a("string");
        });
    });
    it("5 - CREATE a new booking with success", () => {
        cy.request({
            method: "POST",
            url: "/booking",
            headers: { "Content-Type": "application/json" },
            body: {
                firstname: "Bruno",
                lastname: "Henrique",
                totalprice: 194,
                depositpaid: true,
                bookingdates: {
                    checkin: "2018-01-01",
                    checkout: "2019-01-01",
                },
                additionalneeds: "Breakfast",
            },
        })
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.headers).to.have.property(
                    "content-type",
                    "application/json; charset=utf-8"
                );
                expect(response.body).to.be.an("object");
                expect(response.body)
                    .to.have.property("bookingid")
                    .and.to.be.a("number");
                expect(response.body)
                    .to.have.property("booking")
                    .and.to.be.an("object");

                cy.wrap(response).as("bookingCreated", { type: "static" });
                // const booginkID = 0;
                // cy.get("@bookingCreated").then(() => {});

                expect(response.body.booking)
                    .to.have.property("firstname", "Bruno")
                    .and.to.be.a("string");
                expect(response.body.booking)
                    .to.have.property("lastname", "Henrique")
                    .and.to.be.a("string");
                expect(response.body.booking)
                    .to.have.property("totalprice")
                    .and.to.be.a("number");
                expect(response.body.booking)
                    .to.have.property("depositpaid")
                    .and.to.be.a("boolean");
                expect(response.body.booking)
                    .to.have.property("bookingdates")
                    .and.to.be.an("object");
                expect(response.body.booking.bookingdates)
                    .to.have.property("checkin")
                    .and.to.be.a("string");
                expect(response.body.booking.bookingdates)
                    .to.have.property("checkout")
                    .and.to.be.a("string");
            })
            .then(function () {
                cy.request({
                    method: "GET",
                    url: "/booking/" + this.bookingCreated.body.bookingid,
                    headers: { Accept: "application/json" },
                }).then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.headers).to.have.property(
                        "content-type",
                        "application/json; charset=utf-8"
                    );
                    expect(response.body).to.be.an("object");
                    expect(response.body)
                        .to.have.property("firstname", "Bruno")
                        .and.to.be.a("string");
                    expect(response.body)
                        .to.have.property("lastname", "Henrique")
                        .and.to.be.a("string");
                    expect(response.body)
                        .to.have.property("totalprice")
                        .and.to.be.a("number");
                    expect(response.body)
                        .to.have.property("depositpaid")
                        .and.to.be.a("boolean");
                    expect(response.body)
                        .to.have.property("bookingdates")
                        .and.to.be.an("object");
                    expect(response.body.bookingdates)
                        .to.have.property("checkin")
                        .and.to.be.a("string");
                    expect(response.body.bookingdates)
                        .to.have.property("checkout")
                        .and.to.be.a("string");
                });
            });
    });
    it("6 - CREATE a new booking with success - alternative 2", () => {
        cy.request({
            method: "POST",
            url: "/booking",
            headers: { "Content-Type": "application/json" },
            body: {
                firstname: "Bruno",
                lastname: "Henrique",
                totalprice: 194,
                depositpaid: true,
                bookingdates: {
                    checkin: "2018-01-01",
                    checkout: "2019-01-01",
                },
                additionalneeds: "Breakfast",
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.headers).to.have.property(
                "content-type",
                "application/json; charset=utf-8"
            );
            expect(response.body).to.be.an("object");
            expect(response.body)
                .to.have.property("bookingid")
                .and.to.be.a("number");
            expect(response.body)
                .to.have.property("booking")
                .and.to.be.an("object");
            expect(response.body.booking)
                .to.have.property("firstname", "Bruno")
                .and.to.be.a("string");
            expect(response.body.booking)
                .to.have.property("lastname", "Henrique")
                .and.to.be.a("string");
            expect(response.body.booking)
                .to.have.property("totalprice")
                .and.to.be.a("number");
            expect(response.body.booking)
                .to.have.property("depositpaid")
                .and.to.be.a("boolean");
            expect(response.body.booking)
                .to.have.property("bookingdates")
                .and.to.be.an("object");
            expect(response.body.booking.bookingdates)
                .to.have.property("checkin")
                .and.to.be.a("string");
            expect(response.body.booking.bookingdates)
                .to.have.property("checkout")
                .and.to.be.a("string");

            cy.wrap(response.body.bookingid).as("bookingid", {
                type: "static",
            });
        });

        cy.get("@bookingid").then((bookingId) => {
            cy.request({
                method: "GET",
                url: "/booking/" + bookingId,
                headers: { "Content-Type": "application/json" },
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.headers).to.have.property(
                    "content-type",
                    "application/json; charset=utf-8"
                );
                expect(response.body).to.be.an("object");
                expect(response.body)
                    .to.have.property("firstname", "Bruno")
                    .and.to.be.a("string");
                expect(response.body)
                    .to.have.property("lastname", "Henrique")
                    .and.to.be.a("string");
                expect(response.body)
                    .to.have.property("totalprice")
                    .and.to.be.a("number");
                expect(response.body)
                    .to.have.property("depositpaid")
                    .and.to.be.a("boolean");
                expect(response.body)
                    .to.have.property("bookingdates")
                    .and.to.be.an("object");
                expect(response.body.bookingdates)
                    .to.have.property("checkin")
                    .and.to.be.a("string");
                expect(response.body.bookingdates)
                    .to.have.property("checkout")
                    .and.to.be.a("string");
            });
        });
    });
    it("7 - UPDATE booking by id with authorization header", () => {
        cy.get("@token").then((token) => {
            cy.request({
                method: "POST",
                url: "/booking",
                headers: { "Content-Type": "application/json" },
                body: {
                    firstname: "Bruno",
                    lastname: "Henrique",
                    totalprice: 200,
                    depositpaid: false,
                    bookingdates: {
                        checkin: "2018-01-01",
                        checkout: "2019-01-01",
                    },
                    additionalneeds: "Orange Juice",
                },
            }).then((response) => {
                cy.request({
                    method: "PUT",
                    url: "/booking/" + response.body.bookingid,
                    // auth: { user: "admin", password: "password123" },
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                        Cookie: "token=" + token,
                    },
                    body: {
                        firstname: "Bruno",
                        lastname: "Henrique 2",
                        totalprice: 200,
                        depositpaid: false,
                        bookingdates: {
                            checkin: "2018-01-01",
                            checkout: "2019-01-01",
                        },
                        additionalneeds: "Orange Juice",
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                });
            });
        });
    });
});

describe("Test Suite - Booking API testing v2", () => {
    beforeEach(() => {
        // cy.authToken("admin", "password123").as("token");

        cy.fixture("booking/bookingPost.json").as("newBooking");
        cy.fixture("booking/bookingPut.json").as("updatedBooking");
    });
    it("1 - GET all booking ids", () => {
        cy.getRequest("/booking", { "Content-Type": "application/json" }).then(
            (response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an("array");
                expect(response.body).to.have.lengthOf.at.least(1);
                expect(response.body[0]).to.have.property("bookingid");
            }
        );
    });
    it("2 - GET booking id by firstname", () => {
        let queryString = { firstName: "Bruno" };

        cy.getRequest(
            "/booking",
            { "Content-Type": "application/json" },
            queryString
        ).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an("array");
            expect(response.body).to.have.lengthOf.at.least(1);
            expect(response.body[0]).to.have.property("bookingid");
        });
    });
    it("5 - CREATE a new booking with success return status code 200", () => {
        cy.fixture("booking/bookingPost.json").then((newBooking) => {
            cy.postRequest(
                "/booking",
                { "Content-type": "application/json" },
                newBooking
            )
                .then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.headers).to.have.property(
                        "content-type",
                        "application/json; charset=utf-8"
                    );
                    expect(response.body).to.be.an("object");
                    expect(response.body)
                        .to.have.property("bookingid")
                        .and.to.be.a("number");
                    expect(response.body)
                        .to.have.property("booking")
                        .and.to.be.an("object");
                    expect(response.body.booking)
                        .to.have.property("firstname", "Bruno")
                        .and.to.be.a("string");
                    expect(response.body.booking)
                        .to.have.property("lastname", "Henrique")
                        .and.to.be.a("string");
                    expect(response.body.booking)
                        .to.have.property("totalprice")
                        .and.to.be.a("number");
                    expect(response.body.booking)
                        .to.have.property("depositpaid")
                        .and.to.be.a("boolean");
                    expect(response.body.booking)
                        .to.have.property("bookingdates")
                        .and.to.be.an("object");
                    expect(response.body.booking.bookingdates)
                        .to.have.property("checkin")
                        .and.to.be.a("string");
                    expect(response.body.booking.bookingdates)
                        .to.have.property("checkout")
                        .and.to.be.a("string");

                    cy.wrap(response).as("bookingCreated", { type: "static" });
                })
                .then(function () {
                    cy.getRequest(
                        "/booking/" + this.bookingCreated.body.bookingid,
                        { "Content-type": "application/json" }
                    ).then((response) => {
                        expect(response.status).to.eq(200);
                        expect(response.headers).to.have.property(
                            "content-type",
                            "application/json; charset=utf-8"
                        );
                        expect(response.body).to.be.an("object");
                        expect(response.body)
                            .to.have.property("firstname", "Bruno")
                            .and.to.be.a("string");
                        expect(response.body)
                            .to.have.property("lastname", "Henrique")
                            .and.to.be.a("string");
                        expect(response.body)
                            .to.have.property("totalprice")
                            .and.to.be.a("number");
                        expect(response.body)
                            .to.have.property("depositpaid")
                            .and.to.be.a("boolean");
                        expect(response.body)
                            .to.have.property("bookingdates")
                            .and.to.be.an("object");
                        expect(response.body.bookingdates)
                            .to.have.property("checkin")
                            .and.to.be.a("string");
                        expect(response.body.bookingdates)
                            .to.have.property("checkout")
                            .and.to.be.a("string");
                    });
                });
        });
    });
    it("6 - UPDATE booking by id without authorization", () => {
        headers = {
            Accept: "application/json",
            "Content-type": "application/json",
        };

        cy.get("@newBooking").then((newBooking) => {
            cy.postRequest(
                "/booking",
                { "Content-type": "application/json" },
                newBooking
            ).then((response) => {
                cy.get("@updatedBooking").then((updatedBooking) => {
                    cy.putRequest(
                        "/booking/" + response.body.bookingid,
                        headers,
                        updatedBooking
                    ).then((response) => {
                        expect(response.status).to.eq(403);
                        expect(response.headers).to.have.property(
                            "content-type",
                            "text/plain; charset=utf-8"
                        );
                        expect(response.body).to.be.an("string");
                    });
                });
            });
        });
    });
});
