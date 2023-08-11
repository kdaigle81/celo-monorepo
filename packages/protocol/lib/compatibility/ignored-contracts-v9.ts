export const ignoredContractsV9 = [
  // These are Mento contracts which we are no longer maintaining
  'Exchange',
  'ExchangeEUR',
  'ExchangeBRL',
  'GrandaMento',
  'StableToken',
  'StableTokenEUR',
  'StableTokenBRL',
  'StableTokenRegistry',
  'Reserve',
  'ReserveSpenderMultiSig',

  'SortedOracles' 
  // Note: Sorted Oracles ia a Celo Core Contract
  // but as it has also been modified and deployed but the Mento team.
  // We currently need work to be able to upgrade it again:
  // https://github.com/celo-org/celo-monorepo/issues/10435
]

export function getReleaseVersion(branch: string) {
  const regexp = /core-contracts.v(?<version>.*[0-9])/gm
  const matches = regexp.exec(branch)
  const version = parseInt(matches?.groups?.version ?? '0', 10)
  return version
}
