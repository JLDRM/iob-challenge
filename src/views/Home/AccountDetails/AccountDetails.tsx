import { useState } from "react";
import { useAppSelector } from "../../../config/redux/hooks";
import { selectAccount } from "../../../resources/account/account.slice";
import { selectUser } from "../../../resources/user/user.slice";
import EmitTransaction from "../EmitTransaction/EmitTransaction";
import MakeDeposit from "../MakeDeposit/MakeDeposit";
import './AccountDetails.css';

const AccountDetails = (): JSX.Element => {
  const { userInfo } = useAppSelector(selectUser);
  const { balance, loadingBalance, transactions } = useAppSelector(selectAccount);

  const [openMakeDeposit, setOpenMakeDeposit] = useState(false);
  const [openEmitTransaction, setOpenEmitTransaction] = useState(false);

  const onMakeDeposit = () => {
    if (!userInfo?.email) return;
    setOpenMakeDeposit(prev => !prev);
  };

  const onEmitTransaction = () => {
    if (!userInfo?.email) return;
    setOpenEmitTransaction(prev => !prev);

  };

  return (
    <>
      {!userInfo?.email ?
        <h2>Identify yourself to continue</h2>
        : (
          <>
            <h2>Account Details:</h2>

            <section>
              <h3>Balance:</h3>
              <p>{loadingBalance ? '...loading' : balance.toFixed(3)}</p>
            </section>

            <section>
              <h3>Operations:</h3>

              <div className="Operations-menu">
                <button className="Button--primary" onClick={() => onMakeDeposit()}>Make a deposit</button>
                <button className="Button--primary" onClick={() => onEmitTransaction()}>Emit a transaction</button>
              </div>
            </section>

            <section>
              <h3>Transactions:</h3>

              {transactions.length > 0 ? (
                <table className="TransactionsTable">
                  <thead>
                    <tr>
                      <th>From:</th>
                      <th>To:</th>
                      <th>Amount:</th>
                      <th>Operation time:</th>
                    </tr>
                  </thead>

                  <tbody>
                    {transactions.map(transaction => {
                      return (
                        <tr key={transaction.id}>
                          <td>{transaction.from ? transaction.from : '-'}</td>
                          <td>{transaction.to ? transaction.to : '-'}</td>
                          <td>{transaction?.amount ? transaction?.amount : 0}</td>
                          <td>{transaction?.operationDate ? new Date(transaction?.operationDate).toLocaleDateString() : '-'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (<p>No transactions yet</p>)}
            </section>


            <MakeDeposit open={openMakeDeposit} setOpen={setOpenMakeDeposit} />
            <EmitTransaction open={openEmitTransaction} setOpen={setOpenEmitTransaction} />
          </>
        )
      }
    </>
  );
};

export default AccountDetails;