export default class Utils {
  checkLogin = async () => {
    let res = await fetch("/user/dashboard", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (res.status !== 200) {
      return [false, null];
    } else {
      res = await res.json();
      return [true, res];
    }
  };
}
