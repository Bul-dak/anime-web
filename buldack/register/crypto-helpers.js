// Function to hash the password using SHA-256 and crypto.subtle
export const hashPassword = async (password) => {
  // Encode the password as a Uint8Array
  const encoder = new TextEncoder();
  const passwordBytes = encoder.encode(password);

  // Use crypto.subtle.digest to hash the password
  const hashBuffer = await crypto.subtle.digest("SHA-256", passwordBytes);

  // Convert the hash from ArrayBuffer to Hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to byte array
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
};

// Testing the hashPassword function
const password = "password123";

// Run the function multiple times with the same password
hashPassword(password).then((hash1) => {
  console.log("Hash 1:", hash1); // First hash
  hashPassword(password).then((hash2) => {
    console.log("Hash 2:", hash2); // Second hash
    console.log("Hashes match:", hash1 === hash2); // They should match
  });
});
