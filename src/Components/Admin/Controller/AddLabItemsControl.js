import { toastErrorStatus, toastSuccessStatus } from "../../General/sendToast";
import { createlabItem } from "../../../apis/userverification";

export async function submitAddLabItemsForm(
  labitemJson,
  token,
  setToken,
  fetchnewToken,
  username,
  password,
  statuscode
) {
  let enteredOutput = await createlabItem(token, labitemJson);
  console.log(enteredOutput);
  switch (enteredOutput.statuscode) {
    case 200:
      toastSuccessStatus("Lab Item Added Successfully");
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
