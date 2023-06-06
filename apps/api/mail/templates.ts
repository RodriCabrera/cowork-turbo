export const loginTemplate = (name: string, jwt: string, role: string) => `
<head>
  <style>
    body {}

    h1 {
        font-family: monospace;
        text-align: center;
        font-size: 33px;
    }

    button {
        background-color: white;
        border-radius: 5px;
        padding: 10px;
        color: #000;
    }

    a {
        text-decoration: none;
        color: #000;
    }
  </style>
</head>
<body>
    <table
        style="font-family:'proxima nova','century gothic','arial','verdana',sans-serif;font-size:14px;color:#5e5e5e;width:98%;max-width:600px;float:none;margin:0 auto"
        border="0" cellpadding="0" cellspacing="0" valign="top" align="left">
        <tbody>
            <tr align="middle">
                <td style="padding-top:30px;padding-bottom:32px">
                    <h1>BASEBLOOM</h1>
                </td>
            </tr>
            <tr bgcolor="#ffffff">
                <td>
                    <table bgcolor="#ffffff"
                        style="width:100%;line-height:20px;padding:32px;border:1px solid;border-color:#f0f0f0"
                        cellpadding="0">
                        <tbody>
                            <tr>
                                <td style="color:#5e5e5e;font-size:22px;line-height:22px">Hey ${name}!
                                    Welcome to <strong>Base Bloom!</strong></td></br>
                            </tr>


                            <tr>
                                <td style="padding-top:24px">You are about to enter to our website as a ${role}.<br>
                                    <strong>Please click the following link to complete the login:</strong></td>
                            </tr>

                            <tr>
                                <td align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" valign="top">
                                        <tbody>
                                            <tr>
                                                <td align="center"
                                                    style="height:39px;padding-top:24px;padding-bottom:8px">
                                                    <a href="http://localhost:3000/api/login?access_token=${jwt}"
                                                        style="text-decoration:none" target="_blank">
                                                        <span
                                                            style="display:block;padding:9px 32px 7px 31px;border:1px solid;text-align:center;color:#000;border-radius:3px;background-color:#FFF;border-color:#c5c5c5">Login
                                                            to Base Bloom</span>
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td style="font-size:12px;padding:16px 0 30px 50px;color:#999">This is an automatically generated
                    message from Base Bloom. If you need further assistance, please reply this same email.</td>
            </tr>
        </tbody>
    </table>
</body>
`
