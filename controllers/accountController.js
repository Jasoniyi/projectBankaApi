import moment from "moment";

const accounts = [
	{
		"id": 1,
		"accountNumber": 123,
		"createdon": "moment().format()",
		"owner": 1,
		"firstName": "BIll",
		"lastName": "Gates",
		"email": "billgates@xyz.com",
		"type": "savings",
		"accountStatus": "active",
		"balance": 1000	
	}];

class AccountControllers {
		static accountController(req, res){
				const {
					 id, accountNumber, createdon, owner, type, accountStatus, balance, firstName, lastName
						} = req.body
		
		if (!accountNumber) {
							return res.status(400).json({
								status: 400,
								error: "accountNumber is required"
							});
						}

		if (!createdon) {
						return res.status(400).json({
								status: 400,
								error: "date is required"
							});
						}
		if (!accountStatus) {
						return res.status(400).json({
								status: 400,
								error: "account status is required"
								});
						}
		if (!firstName) {
						return res.status(400).json({
								status: 400,
								error: "firstname is required"
										});
						}
		if (!lastName) {
						return res.status(400).json({
								status: 400,
								error: "lastname is required"
						});
								}
		if(accountStatus != "active"){
				return res.status(400).json({
						status: 400,
						error: "account dormant"
				});
						}
		

		const accountSchema = {
							id: accounts.length + 1,
							accountNumber: req.body.accountNumber,
							createdon: moment().format(),
							owner: req.body.owner,
							firstName: req.body.firstName,
							lastName: req.body.lastName,
							email: req.body.email,
							type: req.body.type,
							accountStatus: req.body.accountStatus,
							balance: req.body.balance
						};
						accounts.push(accountSchema);
						return res.status(201).json({ status: 201, data: { ...accountSchema } });

}

static getAccounts(req, res){
	res.send(accounts);
}

static deleteAccount(req, res){
	const account = accounts.find(account => account.accountNumber === parseInt(req.params.accountNumber));
	if (!account) res.status(404).send('account number not found');

 const index =  accounts.indexOf(account);
 accounts.splice(index, 1)

 res.json({
		 "status": 200,
		 "message": " Account successfully deleted"
 })
}

static deactivateAccount(req, res){
	const account = accounts.find(account => account.accountNumber === parseInt(req.params.accountNumber));
	if (!account) res.status(404).send('account ID not found');
	res.status(200).json({
		"status": 200,
		"data": {
				"accountNuber": req.params.accountNumber,
				"accountStatus": req.params.accountStatus === "dormant",
		}
})
}

static activateAccount(req, res){
	const account = accounts.find(account => account.accountNumber === parseInt(req.params.accountNumber));
	if (!account) res.status(404).send('account ID not found');
	res.status(200).json({
		"status": 200,
		"data": {
				"accountNuber": req.params.accountNumber,
				"accountStatus": req.params.accountStatus === "active"
		}
})
}

// static creditAccount(req, res){
// 	const account = accounts.find(account => account.accountNumber === parseInt(req.params.accountNumber));
// 	if (!account) res.status(404).send('account ID not found');

// 	account.amount

	
// }

}


export default AccountControllers;