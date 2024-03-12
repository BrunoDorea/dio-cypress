/* eslint-disable cypress/unsafe-to-chain-command */
/// <reference types='Cypress' />
describe.only("Aprendendo conceitos Cypress", () => {
    it("1 - Usuário faz login com user e senha inválidos", () => {
        cy.visit("/");
        cy.get("div.shop-menu").contains("Login").click();
        cy.get('[data-qa="login-email"]').type("bruno@mail.com");
        cy.get('[data-qa="login-password"]').type("123456");
        cy.get('[data-qa="login-button"]').click();

        cy.contains("Your email or password is incorrect!"); // Verifica mensagem de login incorreto
    });

    it("2 - Acessando Homa da página Automation Exercise", () => {
        cy.visit("/");
        cy.contains("Automation");
        cy.get("h1");
        cy.get("h1").contains("Automation");
        cy.get(".features_items");
        cy.get("div.features_items");
    });

    it("3 - Verificar itens para compra", () => {
        cy.visit("/"); 
        cy.get("div.features_items");
        cy.get("div.features_items").children().first();
        cy.get("div.features_items").children().last();
        cy.get("div.features_items").children().eq(2);
        cy.get('[data-product-id="2"]');
    });

    it("4 - Colocar item no carrinho e continuar comprando", () => {
        cy.visit("/");
        cy.get('[data-product-id="3"]').contains("Add to cart").click();
        // cy.get('.features_items > :nth-child(4) > .product-image-wrapper > .single-products > .productinfo > .btn').click();
        cy.get(".modal-footer > .btn").click();
    });

    it("5 - Acessando página de produto - Usando intercept", () => {
        cy.visit("/");
        cy.intercept("GET", "products");
        cy.get(".navbar-nav").contains("Products").click();
        // cy.get('a[href^="/products"]').contains('Products').click();
    });

    it("6 - GET Produtos - Usando request", () => {
        cy.request("GET", "api/productsList");
    });

    it("7 - Usuário faz login com user e senha inválidos - Com validações (THEN)", () => {
        cy.visit("/");
        cy.get("div.shop-menu")
            .contains("Login")
            .should("have.attr", "href", "/login")
            .click();
        cy.contains("Login to your account").should("be.visible");
        cy.get('[data-qa="login-email"]')
            .type("bruno@mail.com")
            .should("be.visible")
            .and("have.attr", "placeholder", "Email Address")
            .and("have.prop", "required");
        cy.get('[data-qa="login-password"]')
            .type("123456")
            .should("have.value", "123456");
        cy.get('[data-qa="login-button"]')
            .as("btnLogin")
            .then(($button) => {
                expect($button).to.have.text("Login");
                expect($button).to.contain("Login");
                expect($button).to.be.visible;
                expect($button).to.have.attr("type", "submit");
                expect($button).to.have.class("btn");

                cy.wrap($button).click();
            });

        cy.contains("Your email or password is incorrect!"); // Verifica mensagem de login incorreto
    });

    it("8 - Usuário faz login com user e senha inválidos - Com validações (SHOULD)", () => {
        cy.visit("/");

        cy.get("div.shop-menu")
            .contains("Login")
            .should("have.attr", "href", "/login")
            .click();

        cy.contains("Login to your account").should("be.visible");

        cy.get('[data-qa="login-email"]')
            .type("bruno@mail.com")
            .should("be.visible")
            .and("have.attr", "placeholder", "Email Address")
            .and("have.prop", "required");

        cy.get('[data-qa="login-password"]')
            .type("123456")
            .should("have.value", "123456");

        cy.get('[data-qa="login-button"]')
            .should(($button) => {
                expect($button).to.have.text("Login");
                expect($button).to.contain("Login");
                expect($button).to.be.visible;
                expect($button).to.have.attr("type", "submit");
                expect($button).to.have.class("btn");
            })
            .click();

        cy.contains("Your email or password is incorrect!"); // Verifica mensagem de login incorreto
    });

    it("9 - Acessando página de produto - Usando intercept e com validações (Compacto)", () => {
        cy.visit("/");
        cy.intercept("GET", "products").as('getProdutos');
        cy.get(".navbar-nav").contains("Products").then(($btn) => {
            cy.wrap($btn).click();
        });
        cy.wait('@getProdutos').its('response.statusCode').should('eq', 200);
    });
    
    it("10 - Acessando página de produto - Usando intercept e com validações (SHOULD)", () => {
        cy.visit("/");
        cy.intercept("GET", "products").as('getProdutos');
        cy.get(".navbar-nav").contains("Products").then(($btn) => {
            cy.wrap($btn).click();
        });
        cy.wait('@getProdutos').should((interception) => {
            expect(interception.response.statusCode).to.be.eq(200)
        })
    });

    it("11 - GET Produtos retorna 200 - Usando request", () => {
        cy.request("GET", "api/productsList").should((response) => {
            expect(response.status).to.be.eq(200) //validar se status code é 200
            expect(response.duration).to.be.lessThan(1000) //validar se o tempo é inferior a 1000ms
            expect(response.body).not.to.be.empty
            let body = JSON.parse(response.body)
            expect(body.products).to.be.an('array')
            expect(body.products).to.have.length.above(1)
        });
    });

});
