import { useAppSelector } from "../../../config/redux/hooks";
import { selectAccount } from "../../../resources/account/account.slice";
import { selectUser } from "../../../resources/user/user.slice";

const AccountDetails = (): JSX.Element => {
  const { userInfo } = useAppSelector(selectUser);
  const { balance, loadingBalance, transactions } = useAppSelector(selectAccount);

  return (
    <>
      {!userInfo?.email ?
        <h2>Identify yourself to continue</h2>
        : (

          <div>
            <section>
              <h2>Balance:</h2>
              <p>{loadingBalance ? '...loading' : balance}</p>
            </section>

            <section>
              <h2>Transactions:</h2>
              {transactions.map(transaction => {
                return (
                  <div key={transaction.id}>
                    <p>From: {transaction.from}</p>
                    <p>To: {transaction.to}</p>
                    <p>Operation time: {transaction.operationDate.toLocaleDateString()}</p>
                  </div>
                );
              })}
            </section>
          </div>
        )
      }
    </>
  );
};

export default AccountDetails;