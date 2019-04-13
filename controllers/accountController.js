import moment from "moment";

const accounts = [];

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

}


export default AccountControllers;