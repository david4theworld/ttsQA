const app = require('../vendingMachineApp');

const supertest = require('supertest');
const chai = require('chai');

const expect = chai.expect;
const should = chai.should;
const assert = chai.assert;

const api = supertest('http://localhost:3000');

// Assuming that the person in charge of the vending machine servicing is about to initiate the "Shutdown" flow;

let login = null;
let users = null;

// These should cover the exampled system of a basic vending machine and its functionalities;
describe('Vending machine behavior:', () => {

// Valid sign-in attempt after selecting the "Shutdown" option (invalid sign-in attempt will be exampled later);
it('Sign the user in successfully', (done) => {
  api.post('/sign-in')
    .send({
      password: 'password',
      email: 'email',
    })
    .then((res) => {
      expect(res.statusCode).to.equal(200);
      login = res.body.access_token;
      done();
    }).
    catch(done);
});

// Report of the turnover made in the previous session, since the last shutdown flow and reset;
it('Report the previous session turnover', (done) => {
  api.get('/turnoverReport')
    .set('authorization', login)
    .then((res) => {
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.not.be.empty;
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.equal(5);
      expect(res.body[0],[1],[2],[3],[4]).to.have.property('qtyInit' || 'qtyEnd' || 'cost' || 'turnover');
      expect(res.body[0],[1],[2],[3],[4].qtyInit).to.not.equal(null);
      expect(res.body[0],[1],[2],[3],[4].qtyEnd).to.not.equal(null);
      expect(res.body[0],[1],[2],[3],[4].cost).to.not.equal(null);
      expect(res.body[0],[1],[2],[3],[4].turnover).to.not.equal(null);
      // et cetera... continue validating the propety values and the turnover components pre-defined via the documentation - e.g. the number of items sold per drink class, turnover per class, total item number, total turnover... and so on;
    reset();
    done();
    }).
  catch(done);
});

  it('UI guidelines meet the documented criteria', (done) => {
    // The given task included no specifications on how the test should be handled regarding the UI, hence only the general directions will be applied below;
    api.get('/DOM')
    // DOM as a dummy label representing the much greater scope of guidelines to be tested, which should either be programmatically determined or otherwise tested manually;
      .then ((res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.not.be.empty;
        expect(res.body.dom).to.not.equal(null);
        // et cetera... continue defining the guidelines;
      done();
    }).
  catch(done);
  });

  /* Verify that the initial state is as per provided documentation and established criteria
   - This should consist of a test case (test cases) that covers the exact specification and fails any other state!
   - It should be run exclusively upon the reset completion.
  */
  it('Initial state validation', (done) => {
    // For scalability, this should be made universal so it does not depend on the varying amount of different kinds of drinks that might be available;
		api.get('/drinks/item/i')
			.then((res) => {
				expect(res.statusCode).to.equal(200);
				expect(res.body).to.not.be.empty;
				expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(5);
				expect(res.body[i]).to.have.property('name' || 'cost' || 'qtyInit' || 'qtyEnd');
				expect(res.body.name).to.not.equal(null);
				expect(res.body.cost).to.not.equal(null);
				expect(res.body.qtyInit).to.not.equal(null);
				expect(res.body.qtyEnd).to.not.equal(null);
				// et cetera... validate the expected values, data types and other criteria composing the intial state;
			done();
			}).
		catch(done);
	});

/* In continuation, depending on the core logic and mechanism of the user flow, the following should be ensured:
1) Only the drink selection UI is available and active
  - test for multiple choice, negative flow, input validation etc.
2) Upon selection, only the money amount input field is available and active
  - input validation, UX validation (e.g. only numeric keyboard is active) and negative flows.
  - error communication and modification instructions
3) Upon confirmation, the backend process should be validated, and its frontend output
  - internal calculation of the given variables (e.g. turnover and qtyEnd)
  - change return
  - info of the new state relayed to the user
  - criteria of the UI and UX validated
  - starting state hook and intitation validated
*/

  // Example of addressing an expected error for an invalid "Shutdown" authentication;
  it('Auth err check', (done) => {
    api.get('/users/1/accounts')
      .then((res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.not.be.empty;
        expect(res.body).have.property('error');
        expect(res.body.error).to.equal(true);
        expect(true, 'Missing authorization token').to.be.ok;
      done();
      }).
    catch(done);
  });

  // Example of addressing an expected error for an invalid drink selection;
  it('Invalid selection validation', (done) => {
    api.get('/drinks/item/x')
      .then((res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.not.be.empty;
        expect(res.body).have.property('error');
        expect(res.body.error).to.equal(true);
        expect(res.body.message).to.equal("Your chosen item is not currently available");
        expect(true, 'loadInitialScreen').to.be.ok;
      done();
      }).
    catch(done);
  });
});


/* Please note once again that all of the above is merely a showcase of certain scenarios and cases and is by no means a complete testing script */
