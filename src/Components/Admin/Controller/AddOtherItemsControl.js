import { toastErrorStatus, toastSuccessStatus } from "../../General/sendToast";
import { createOtherItem } from "../../../apis/userverification";

export async function submitAddOtherItemsForm(
  otheritemJson,
  token,
  setToken,
  fetchnewToken,
  username,
  password,
  statuscode
) {
  let enteredOutput = await createOtherItem(token, otheritemJson);
  console.log(enteredOutput);
  switch (enteredOutput.statuscode) {
    case 200:
      toastSuccessStatus("Other Item Data Added Successfully");
      break;
    case 400:
      toastErrorStatus("No details Entered!!");
      break;
    case 401:
      await fetchnewToken(
        process.env.REACT_APP_GetTokenURL,
        username,
        password
      );
      if (statuscode == 401) {
        setToken("");
        toastErrorStatus("UnAuthorised Access. Login Again!!");
        break;
      }
      break;
    default:
      toastErrorStatus("Something went wrong. Try Again!!");
      break;
  }
}
