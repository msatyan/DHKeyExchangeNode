const crypto = require('crypto');
const assert = require('assert');

function mydhkeyex1()
{
    // Generate Alice's keys...
    const alice = crypto.createDiffieHellman(2048);
    const alicePubKey = alice.generateKeys();

    // Let us use prime and generator used by alice as common
    const common_prime = alice.getPrime();
    const common_g     = alice.getGenerator();

    // Generator is normally small number, then let it be inline
    console.log( "---common_g : " + common_g.toString('hex') );

    console.log( "---common_prime :" );
    console.log( common_prime.toString('hex') );

    
    // Use the common prime and generator to
    // Generate Bob's keys...
    const bob = crypto.createDiffieHellman( common_prime, common_g );
    const bobPubKey = bob.generateKeys();

    // Exchange Public Keys and generate the secret...
    const aliceSecret = alice.computeSecret(bobPubKey);
    const bobSecret = bob.computeSecret(alicePubKey);

    console.log();
    console.log();
    console.log( "---alicePubKey : ");
    console.log( alicePubKey.toString('hex') );
    console.log();

    console.log( "---bobPubKey   : " );
    console.log( bobPubKey.toString('hex') );
    console.log();
    console.log();


    // Check the both secrets are identical
    hx_aliceSecret = aliceSecret.toString('hex');
    hx_bobSecret = bobSecret.toString('hex');
    assert.strictEqual( hx_aliceSecret, hx_bobSecret);

    // For Debug only 
    console.log( "**** For Debug only: Keep it Secret ****" );
    console.log( "---aliceSecret:");
    console.log( hx_aliceSecret);
    console.log();

    console.log( "---bobSecret:");
    console.log( hx_bobSecret);
    console.log();
}

mydhkeyex1();


/*
---common_g : 02
---common_prime :
f546a6b87f24f04d6459224814b4b26fe2d627e3a1927eeaa48314026753287b3b0f4166f4dabcf1
e31c22a360e6c0a0ba1207e54c61075d2e22062c049eb1a6f1c1d9897a9725fdc1fa7d1fb01f9758
3d5edbfa2e5796d16f1f816c9b1a868e65f5eac0313c083f21eca397074a25c23bca044f00fd662c
b12d5a774268a6eed868ca44fabfb09263fd150636bc408ecff6a2b1b4eecc99abb7b490ed1ce6b7
75df24d4ab1ce5c107fa66d4d869fe21c08dda26421b27d8583aad6812e460d14913a9871b9e1e79
4d06abb5198dd3816ec55b9761329a45614f3423583dc90b039a0d106be9e39f6078e8fe7a7d8243
b1eb5bdee8c605da08f00aac44acd40b


---alicePubKey :
ba51a6c00d17ecf6b9ecdf4776373312723b959103053d03bf0234b99ce61f650c662d2dce7a8bb1
7bf8d0079367a53628241ac85e96e32985955c4a52d23b5996b51dd192899f25347d04a0df6c2890
e0ca71db23baa5be9f3d3a004e7a8ff5933e242359dcc57f47acbd6bdb91aecf8e6e0f74b9b35452
059c4124a2189aaa2b78f758b04c1882857bf84ce74c138409edf6a804916181c64f802f2e65c7c0
d7f19ee2c799094b1866f09f590a9fe191391a1a3fa65014cb6c6b218f4ccae8f81f50751709894d
fa720d4a5c0b1c85a98cf4667d0f03cce275c9e03b424c05ac8d7d8caddbfafc7c46da1f7717a9ca
0908a22322beb2908ccaa9442844d7f6

---bobPubKey   :
08d9a37c85513f8d06a6e09042f797346eafeae0727594d6ce0d30baf028f5a0120b34b4123d7ee8
53794ed78494597f63033945f7fd8b6c1e92eed2369a473eed666544125cd1907348d16cec628364
50d30945ce35dbfe65fde2c7ce534813b460aac487dca72c049923f1858fb8554a1c325405435314
a4b7872b8f306d992f86c215334248c74663ee75b8015d58cbe5ed51746dd3816168792d42492e4a
d02cd9c0a7241d24cf2320b990e27ee65590cb2402d361b96f17add59c5599ffa00332997a0b6ab6
6cce7a3ec6ee9cbf6d92d37dd1ac9408b0ca0fe91e4a4addd8662fa50b38ff46c1b0e53f2822e880
249a6d9c1d665b28bbcc56fa54d2e735


**** For Debug only: Keep it Secret ****
---aliceSecret:
08e8630951aa01abc1e19fff6f4959c99de2f4242c7f8891dbab2c1a652ec20498dc5f2c07fa76cc
0d333e96a454c8e9e188fee4622960204ce8ff45fd16f7e29c300f53e1f46549e4a3f1fa480979fe
a785cb8286b73f04edd0a42a9bd6f5f3683b30327441633e5a206bb2d907fd93b8f0b7b6680233aa
4ecc4cb561ecc5fc41817fecb1139a46497d476f9f9e007d8e03cd54051b1fd385a19e0cbfcd9e08
66e5bffd94b7313d9d0999d88be34558ed6d92e4aaf03b2ff8b905f3ebbf049f7b38f97f10082b4b
24dd06d94cd648195d502cefa560f959bc64159732a324b8c63a280f477c14626695442c2e7a5a9f
ab2e40a95882935e6237eef13134427d

---bobSecret:
08e8630951aa01abc1e19fff6f4959c99de2f4242c7f8891dbab2c1a652ec20498dc5f2c07fa76cc
0d333e96a454c8e9e188fee4622960204ce8ff45fd16f7e29c300f53e1f46549e4a3f1fa480979fe
a785cb8286b73f04edd0a42a9bd6f5f3683b30327441633e5a206bb2d907fd93b8f0b7b6680233aa
4ecc4cb561ecc5fc41817fecb1139a46497d476f9f9e007d8e03cd54051b1fd385a19e0cbfcd9e08
66e5bffd94b7313d9d0999d88be34558ed6d92e4aaf03b2ff8b905f3ebbf049f7b38f97f10082b4b
24dd06d94cd648195d502cefa560f959bc64159732a324b8c63a280f477c14626695442c2e7a5a9f
ab2e40a95882935e6237eef13134427d

*/