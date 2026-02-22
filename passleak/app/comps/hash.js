async function checkMyPwd(pwd) {
  if (pwd) {
    const hash = await hashMyPwd(pwd);
    const hashList = await receiveHashsList(hash)
    const result = findHashInList(hash, hashList)

    return result
  }
}

async function hashMyPwd(pwd) {
  const buffer = await crypto.subtle.digest(
    'SHA-1',
    new TextEncoder().encode(pwd)
  );

  return [...new Uint8Array(buffer)]
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
}


async function receiveHashsList(hash) {
  const prefix = hash.slice(0, 5);
  const url = "https://api.pwnedpasswords.com/range/" + prefix;

  const result = await fetch(url);
  const data = await result.text();

  return data;
}

function findHashInList(hash, hashsText) {
  const hashList = hashsText.trim().split(/\r?\n/)
  const sufix = hash.slice(5).split(":")[0]

  return hashList.some(line => {
    const [hashSuffix] = line.split(':');
    return hashSuffix === sufix;
  });
}

export default checkMyPwd;