import moment from "moment";

const transactions = [];

class TransactionController {
	static creditAccount(req, res) {
		    const {
		      transactionid, accountNumber, amount, cashier, createdon, transactiontype, oldBalance, newBalance
				} = req.body;

				if(!accountNumber){
					return res.status(400).json({
						  status: 400,
						  error: "Account number is required"
						});
				}

				if(!transactiontype){
					return res.status(400).json({
						  status: 400,
						  error: "Transaction type is required"
						});
				}

				if(transactiontype != "credit"){
					return res.status(400).json({
						  status: 400,
						  error: "Transaction type is not credit"
						});
				}

				if(!amount){
					return res.status(400).json({
						  status: 400,
						  error: "Amount is not stated"
						});
				}

				if(newBalance != oldBalance + amount){
					return res.status(400).json({
						  status: 400,
						  error: "Amount is not updated"
						});
				}

				if(!transactionid){
					return res.status(400).json({
						  status: 400,
						  error: "Transaction id is required"
						});
				}
				
				const transactionSchema = {
					      transactionid: req.body.transactionid,
					      accountNumber: req.body.accountNumber,
					      amount: req.body.amount,
								cashier: req.body.cashier,
								createdon: moment().format(),
								transactiontype: req.body.transactiontype,
								oldBalance: req.body.oldBalance,
								newBalance: req.body.newBalance
					      
							};
							
							const transactioncredit = transactions.find(transactionSchema => transactionSchema.accountNumber === Number(req.params.accountNumber));
							res.send(transactioncredit);
						  if (!transactioncredit) return res.status(404)
					    return res.status(201).json({ status: 201, data: { ...transactionSchema } });
						}

						static debitAccount(req, res) {
							const {
								transactionid, accountNumber, amount, cashier, createdon, transactiontype, oldBalance, newBalance
							} = req.body;
			
							if(!accountNumber){
								return res.status(400).json({
										status: 400,
										error: "Account number is required"
									});
							}
			
							if(!transactiontype){
								return res.status(400).json({
										status: 400,
										error: "Transaction type is required"
									});
							}
			
							if(transactiontype != "debit"){
								return res.status(400).json({
										status: 400,
										error: "Transaction type is not debit"
									});
							}
			
							if(!amount){
								return res.status(400).json({
										status: 400,
										error: "Amount is not stated"
									});
							}
			
							if(newBalance != amount - oldBalance){
								return res.status(400).json({
										status: 400,
										error: "Incorrect amount"
									});
							}
			
							if(!transactionid){
								return res.status(400).json({
										status: 400,
										error: "Transaction id is required"
									});
							}
							
							const transactionSchema = {
											transactionid: req.body.transactionid,
											accountNumber: req.body.accountNumber,
											amount: req.body.amount,
											cashier: req.body.cashier,
											createdon: moment().format(),
											transactiontype: req.body.transactiontype,
											oldBalance: req.body.oldBalance,
											newBalance: req.body.newBalance
											
										};
										
										const transactiondebit = transactions.find(transactionSchema => transactionSchema.accountNumber === Number(req.params.accountNumber));
										res.send(transactiondebit);
										if (!transactiondebit) return res.status(404)
										return res.status(201).json({ status: 201, data: { ...transactionSchema } });
									}

}


export default TransactionController;