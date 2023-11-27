test("string matchers",() => {

    var string1 = "BrowserStack - Automation tool"

    // test for match the string - Success

    expect(string1).toMatch(/tool/);




    // test for not match the string - Failure

    expect(string1).not.toMatch(/abc/)});
