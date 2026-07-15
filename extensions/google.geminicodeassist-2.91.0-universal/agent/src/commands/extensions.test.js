/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { describe, it, expect, vi } from 'vitest';
import { ExtensionsCommand, ListExtensionsCommand } from './extensions.js';
const mockListExtensions = vi.hoisted(() => vi.fn());
vi.mock('@google/gemini-cli-core', async (importOriginal) => {
    const original = await importOriginal();
    return {
        ...original,
        listExtensions: mockListExtensions,
    };
});
describe('ExtensionsCommand', () => {
    it('should have the correct name', () => {
        const command = new ExtensionsCommand();
        expect(command.name).toEqual('extensions');
    });
    it('should have the correct description', () => {
        const command = new ExtensionsCommand();
        expect(command.description).toEqual('Manage extensions.');
    });
    it('should have "extensions list" as a subcommand', () => {
        const command = new ExtensionsCommand();
        expect(command.subCommands.map((c) => c.name)).toContain('extensions list');
    });
    it('should be a top-level command', () => {
        const command = new ExtensionsCommand();
        expect(command.topLevel).toBe(true);
    });
    it('should default to listing extensions', async () => {
        const command = new ExtensionsCommand();
        const mockConfig = { config: {} };
        const mockExtensions = [{ name: 'ext1' }];
        mockListExtensions.mockReturnValue(mockExtensions);
        const result = await command.execute(mockConfig, []);
        expect(result).toEqual({ name: 'extensions list', data: mockExtensions });
        expect(mockListExtensions).toHaveBeenCalledWith(mockConfig.config);
    });
});
describe('ListExtensionsCommand', () => {
    it('should have the correct name', () => {
        const command = new ListExtensionsCommand();
        expect(command.name).toEqual('extensions list');
    });
    it('should call listExtensions with the provided config', async () => {
        const command = new ListExtensionsCommand();
        const mockConfig = { config: {} };
        const mockExtensions = [{ name: 'ext1' }];
        mockListExtensions.mockReturnValue(mockExtensions);
        const result = await command.execute(mockConfig, []);
        expect(result).toEqual({ name: 'extensions list', data: mockExtensions });
        expect(mockListExtensions).toHaveBeenCalledWith(mockConfig.config);
    });
    it('should return a message when no extensions are installed', async () => {
        const command = new ListExtensionsCommand();
        const mockConfig = { config: {} };
        mockListExtensions.mockReturnValue([]);
        const result = await command.execute(mockConfig, []);
        expect(result).toEqual({
            name: 'extensions list',
            data: 'No extensions installed.',
        });
        expect(mockListExtensions).toHaveBeenCalledWith(mockConfig.config);
    });
});
//# sourceMappingURL=extensions.test.js.map
// SIG // Begin signature block
// SIG // MIIvWgYJKoZIhvcNAQcCoIIvSzCCL0cCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // Rgw7uE8pKGKSeJc+pFtg2luWTWmQttLgP5LkXYDAY/ug
// SIG // ghQJMIIFkDCCA3igAwIBAgIQBZsbV56OITLiOQe9p3d1
// SIG // XDANBgkqhkiG9w0BAQwFADBiMQswCQYDVQQGEwJVUzEV
// SIG // MBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3
// SIG // d3cuZGlnaWNlcnQuY29tMSEwHwYDVQQDExhEaWdpQ2Vy
// SIG // dCBUcnVzdGVkIFJvb3QgRzQwHhcNMTMwODAxMTIwMDAw
// SIG // WhcNMzgwMTE1MTIwMDAwWjBiMQswCQYDVQQGEwJVUzEV
// SIG // MBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3
// SIG // d3cuZGlnaWNlcnQuY29tMSEwHwYDVQQDExhEaWdpQ2Vy
// SIG // dCBUcnVzdGVkIFJvb3QgRzQwggIiMA0GCSqGSIb3DQEB
// SIG // AQUAA4ICDwAwggIKAoICAQC/5pBzaN675F1KPDAiMGkz
// SIG // 7MKnJS7JIT3yithZwuEppz1Yq3aaza57G4QNxDAf8xuk
// SIG // OBbrVsaXbR2rsnnyyhHS5F/WBTxSD1Ifxp4VpX6+n6lX
// SIG // FllVcq9ok3DCsrp1mWpzMpTREEQQLt+C8weE5nQ7bXHi
// SIG // LQwb7iDVySAdYyktzuxeTsiT+CFhmzTrBcZe7FsavOvJ
// SIG // z82sNEBfsXpm7nfISKhmV1efVFiODCu3T6cw2Vbuyntd
// SIG // 463JT17lNecxy9qTXtyOj4DatpGYQJB5w3jHtrHEtWoY
// SIG // OAMQjdjUN6QuBX2I9YI+EJFwq1WCQTLX2wRzKm6RAXwh
// SIG // TNS8rhsDdV14Ztk6MUSaM0C/CNdaSaTC5qmgZ92kJ7yh
// SIG // Tzm1EVgX9yRcRo9k98FpiHaYdj1ZXUJ2h4mXaXpI8OCi
// SIG // EhtmmnTK3kse5w5jrubU75KSOp493ADkRSWJtppEGSt+
// SIG // wJS00mFt6zPZxd9LBADMfRyVw4/3IbKyEbe7f/LVjHAs
// SIG // QWCqsWMYRJUadmJ+9oCw++hkpjPRiQfhvbfmQ6QYuKZ3
// SIG // AeEPlAwhHbJUKSWJbOUOUlFHdL4mrLZBdd56rF+NP8m8
// SIG // 00ERElvlEFDrMcXKchYiCd98THU/Y+whX8QgUWtvsauG
// SIG // i0/C1kVfnSD8oR7FwI+isX4KJpn15GkvmB0t9dmpsh3l
// SIG // GwIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MA4GA1Ud
// SIG // DwEB/wQEAwIBhjAdBgNVHQ4EFgQU7NfjgtJxXWRM3y5n
// SIG // P+e6mK4cD08wDQYJKoZIhvcNAQEMBQADggIBALth2X2p
// SIG // bL4XxJEbw6GiAI3jZGgPVs93rnD5/ZpKmbnJeFwMDF/k
// SIG // 5hQpVgs2SV1EY+CtnJYYZhsjDT156W1r1lT40jzBQ0Cu
// SIG // HVD1UvyQO7uYmWlrx8GnqGikJ9yd+SeuMIW59mdNOj6P
// SIG // WTkiU0TryF0Dyu1Qen1iIQqAyHNm0aAFYF/opbSnr6j3
// SIG // bTWcfFqK1qI4mfN4i/RN0iAL3gTujJtHgXINwBQy7zBZ
// SIG // Lq7gcfJW5GqXb5JQbZaNaHqasjYUegbyJLkJEVDXCLG4
// SIG // iXqEI2FCKeWjzaIgQdfRnGTZ6iahixTXTBmyUEFxPT9N
// SIG // cCOGDErcgdLMMpSEDQgJlxxPwO5rIHQw0uA5NBCFIRUB
// SIG // COhVMt5xSdkoF1BN5r5N0XWs0Mr7QbhDparTwwVETyw2
// SIG // m+L64kW4I1NsBm9nVX9GtUw/bihaeSbSpKhil9Ie4u1K
// SIG // i7wb/UdKDd9nZn6yW0HQO+T0O/QEY+nvwlQAUaCKKsnO
// SIG // eMzV6ocEGLPOr0mIr/OSmbaz5mEP0oUA51Aa5BuVnRmh
// SIG // uZyxm7EAHu/QD09CbMkKvO5D+jpxpchNJqU1/YldvIVi
// SIG // HTLSoCtU7ZpXwdv6EM8Zt4tKG48BtieVU+i2iW1bvGjU
// SIG // I+iLUaJW+fCmgKDWHrO8Dw9TdSmq6hN35N6MgSGtBxBH
// SIG // Ea2HPQfRdbzP82Z+MIIGsDCCBJigAwIBAgIQCK1AsmDS
// SIG // nEyfXs2pvZOu2TANBgkqhkiG9w0BAQwFADBiMQswCQYD
// SIG // VQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkw
// SIG // FwYDVQQLExB3d3cuZGlnaWNlcnQuY29tMSEwHwYDVQQD
// SIG // ExhEaWdpQ2VydCBUcnVzdGVkIFJvb3QgRzQwHhcNMjEw
// SIG // NDI5MDAwMDAwWhcNMzYwNDI4MjM1OTU5WjBpMQswCQYD
// SIG // VQQGEwJVUzEXMBUGA1UEChMORGlnaUNlcnQsIEluYy4x
// SIG // QTA/BgNVBAMTOERpZ2lDZXJ0IFRydXN0ZWQgRzQgQ29k
// SIG // ZSBTaWduaW5nIFJTQTQwOTYgU0hBMzg0IDIwMjEgQ0Ex
// SIG // MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA
// SIG // 1bQvQtAorXi3XdU5WRuxiEL1M4zrPYGXcMW7xIUmMJ+k
// SIG // jmjYXPXrNCQH4UtP03hD9BfXHtr50tVnGlJPDqFX/IiZ
// SIG // wZHMgQM+TXAkZLON4gh9NH1MgFcSa0OamfLFOx/y78tH
// SIG // WhOmTLMBICXzENOLsvsI8IrgnQnAZaf6mIBJNYc9URno
// SIG // kCF4RS6hnyzhGMIazMXuk0lwQjKP+8bqHPNlaJGiTUyC
// SIG // EUhSaN4QvRRXXegYE2XFf7JPhSxIpFaENdb5LpyqABXR
// SIG // N/4aBpTCfMjqGzLmysL0p6MDDnSlrzm2q2AS4+jWufcx
// SIG // 4dyt5Big2MEjR0ezoQ9uo6ttmAaDG7dqZy3SvUQakhCB
// SIG // j7A7CdfHmzJawv9qYFSLScGT7eG0XOBv6yb5jNWy+TgQ
// SIG // 5urOkfW+0/tvk2E0XLyTRSiDNipmKF+wc86LJiUGsoPU
// SIG // XPYVGUztYuBeM/Lo6OwKp7ADK5GyNnm+960IHnWmZcy7
// SIG // 40hQ83eRGv7bUKJGyGFYmPV8AhY8gyitOYbs1LcNU9D4
// SIG // R+Z1MI3sMJN2FKZbS110YU0/EpF23r9Yy3IQKUHw1cVt
// SIG // JnZoEUETWJrcJisB9IlNWdt4z4FKPkBHX8mBUHOFECMh
// SIG // WWCKZFTBzCEa6DgZfGYczXg4RTCZT/9jT0y7qg0IU0F8
// SIG // WD1Hs/q27IwyCQLMbDwMVhECAwEAAaOCAVkwggFVMBIG
// SIG // A1UdEwEB/wQIMAYBAf8CAQAwHQYDVR0OBBYEFGg34Ou2
// SIG // O/hfEYb7/mF7CIhl9E5CMB8GA1UdIwQYMBaAFOzX44LS
// SIG // cV1kTN8uZz/nupiuHA9PMA4GA1UdDwEB/wQEAwIBhjAT
// SIG // BgNVHSUEDDAKBggrBgEFBQcDAzB3BggrBgEFBQcBAQRr
// SIG // MGkwJAYIKwYBBQUHMAGGGGh0dHA6Ly9vY3NwLmRpZ2lj
// SIG // ZXJ0LmNvbTBBBggrBgEFBQcwAoY1aHR0cDovL2NhY2Vy
// SIG // dHMuZGlnaWNlcnQuY29tL0RpZ2lDZXJ0VHJ1c3RlZFJv
// SIG // b3RHNC5jcnQwQwYDVR0fBDwwOjA4oDagNIYyaHR0cDov
// SIG // L2NybDMuZGlnaWNlcnQuY29tL0RpZ2lDZXJ0VHJ1c3Rl
// SIG // ZFJvb3RHNC5jcmwwHAYDVR0gBBUwEzAHBgVngQwBAzAI
// SIG // BgZngQwBBAEwDQYJKoZIhvcNAQEMBQADggIBADojRD2N
// SIG // CHbuj7w6mdNW4AIapfhINPMstuZ0ZveUcrEAyq9sMCcT
// SIG // Ep6QRJ9L/Z6jfCbVN7w6XUhtldU/SfQnuxaBRVD9nL22
// SIG // heB2fjdxyyL3WqqQz/WTauPrINHVUHmImoqKwba9oUgY
// SIG // ftzYgBoRGRjNYZmBVvbJ43bnxOQbX0P4PpT/djk9ntSZ
// SIG // z0rdKOtfJqGVWEjVGv7XJz/9kNF2ht0csGBc8w2o7uCJ
// SIG // ob054ThO2m67Np375SFTWsPK6Wrxoj7bQ7gzyE84FJKZ
// SIG // 9d3OVG3ZXQIUH0AzfAPilbLCIXVzUstG2MQ0HKKlS43N
// SIG // b3Y3LIU/Gs4m6Ri+kAewQ3+ViCCCcPDMyu/9KTVcH4k4
// SIG // Vfc3iosJocsL6TEa/y4ZXDlx4b6cpwoG1iZnt5LmTl/e
// SIG // eqxJzy6kdJKt2zyknIYf48FWGysj/4+16oh7cGvmoLr9
// SIG // Oj9FpsToFpFSi0HASIRLlk2rREDjjfAVKM7t8RhWByov
// SIG // EMQMCGQ8M4+uKIw8y4+ICw2/O/TOHnuO77Xry7fwdxPm
// SIG // 5yg/rBKupS8ibEH5glwVZsxsDsrFhsP2JjMMB0ug0wcC
// SIG // ampAMEhLNKhRILutG4UI4lkNbcoFUCvqShyepf2gpx8G
// SIG // dOfy1lKQ/a+FSCH5Vzu0nAPthkX0tGFuv2jiJmCG6siv
// SIG // qf6UHedjGzqGVnhOMIIHvTCCBaWgAwIBAgIQC1DPJGsm
// SIG // Pv2FpykxUVjz/zANBgkqhkiG9w0BAQsFADBpMQswCQYD
// SIG // VQQGEwJVUzEXMBUGA1UEChMORGlnaUNlcnQsIEluYy4x
// SIG // QTA/BgNVBAMTOERpZ2lDZXJ0IFRydXN0ZWQgRzQgQ29k
// SIG // ZSBTaWduaW5nIFJTQTQwOTYgU0hBMzg0IDIwMjEgQ0Ex
// SIG // MB4XDTI0MDQwODAwMDAwMFoXDTI3MDQxMDIzNTk1OVow
// SIG // gcUxEzARBgsrBgEEAYI3PAIBAxMCVVMxGTAXBgsrBgEE
// SIG // AYI3PAIBAhMIRGVsYXdhcmUxHTAbBgNVBA8MFFByaXZh
// SIG // dGUgT3JnYW5pemF0aW9uMRAwDgYDVQQFEwczNTgyNjkx
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKQ2FsaWZvcm5p
// SIG // YTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzETMBEGA1UE
// SIG // ChMKR29vZ2xlIExMQzETMBEGA1UEAxMKR29vZ2xlIExM
// SIG // QzCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIB
// SIG // ALEbiH4H31sVTQxVJTBpKgRjwYubR+0ZwqBSXudeNE/v
// SIG // HfytN3fyutyz2lycUKCW6X3qPjK+zb3+uwbC2WkjRksq
// SIG // NNXqTQYgrBJuksJxRD+cSShaZG/7sJaey0R3WNa5wlAb
// SIG // BrZBAMwgZXaLX0YDr1NzcknsjCou4o7y6jh/0TjC0bo7
// SIG // wYsVKb0Pq1oN2zYwO48NaFeU4bNn7AgEwwYy6GVLoPtr
// SIG // ziEq8TVn4i9kU6wRWyUNBmBRyyAoFsbcyQPnr7wp13PX
// SIG // s5sIy6FI85XC3/NTC881SdXClMJEpoQzgjj6BpJgDaiw
// SIG // hM6muReB1zReN4J2rPsuEwFxp/cSeCaE3bOj5+rSMe4H
// SIG // 1gt5U+k9U1/pRe8jyJ9DSG7c3q18HIa3znV5I26DtG5D
// SIG // +An8iK1gBQpI1kPJyLttRePBjEwav9L7I6iSa2ygp2Aw
// SIG // 8bhjmIFzdK68eBpAwxCNfhY4JUY6e6ors5F5zWqebwcC
// SIG // L2kFJxAYDLML1Gw625Jos/9Fop+VNglkuN4PKo/qYJaD
// SIG // RRqaNLl+5VkwCSakbIo0M03hMBEDUe0urQFzDqXxHAD1
// SIG // tvjiCwgyLL8eDa2Co7+QhZlblAFL7IKWri9GFBZ0RCgG
// SIG // Qj+nA6r//FbYbU00PDgOKHjrJduad4gH6aRwG62MZAGx
// SIG // JcK+yfKxMs+zesiVzeTINs91AgMBAAGjggICMIIB/jAf
// SIG // BgNVHSMEGDAWgBRoN+Drtjv4XxGG+/5hewiIZfROQjAd
// SIG // BgNVHQ4EFgQUT17SRem6UfzmqjVYayx7xFZ0MjQwPQYD
// SIG // VR0gBDYwNDAyBgVngQwBAzApMCcGCCsGAQUFBwIBFhto
// SIG // dHRwOi8vd3d3LmRpZ2ljZXJ0LmNvbS9DUFMwDgYDVR0P
// SIG // AQH/BAQDAgeAMBMGA1UdJQQMMAoGCCsGAQUFBwMDMIG1
// SIG // BgNVHR8Ega0wgaowU6BRoE+GTWh0dHA6Ly9jcmwzLmRp
// SIG // Z2ljZXJ0LmNvbS9EaWdpQ2VydFRydXN0ZWRHNENvZGVT
// SIG // aWduaW5nUlNBNDA5NlNIQTM4NDIwMjFDQTEuY3JsMFOg
// SIG // UaBPhk1odHRwOi8vY3JsNC5kaWdpY2VydC5jb20vRGln
// SIG // aUNlcnRUcnVzdGVkRzRDb2RlU2lnbmluZ1JTQTQwOTZT
// SIG // SEEzODQyMDIxQ0ExLmNybDCBlAYIKwYBBQUHAQEEgYcw
// SIG // gYQwJAYIKwYBBQUHMAGGGGh0dHA6Ly9vY3NwLmRpZ2lj
// SIG // ZXJ0LmNvbTBcBggrBgEFBQcwAoZQaHR0cDovL2NhY2Vy
// SIG // dHMuZGlnaWNlcnQuY29tL0RpZ2lDZXJ0VHJ1c3RlZEc0
// SIG // Q29kZVNpZ25pbmdSU0E0MDk2U0hBMzg0MjAyMUNBMS5j
// SIG // cnQwCQYDVR0TBAIwADANBgkqhkiG9w0BAQsFAAOCAgEA
// SIG // tWb9U46/Mxfbnpi8mtN8CdXLVl4tSWvsVqzs9HopC1jf
// SIG // /crM0cOsWNH09wcwd0RMXm9emge5jENyq7GOk0vqLLio
// SIG // FAktTqICdKqrkwp2csGIYyVMEDwBe5R3RQ0xr281+F0C
// SIG // FB2C38fmrHZXDPjLtb2AGIbvG5fY7oo9VIkmphrNTKsY
// SIG // 9Pzv5g/pAjDjmoeyh266xmGNt8WaOyCjK2PQivipS1ew
// SIG // onKzCGuNTKo3g5XvyFe1A51diis1KuV9EGth6jKAujRP
// SIG // mCV2u9pZayhDTv/6eF+uKFEEzc0GLaLjiUw0CQ9JYYgb
// SIG // 8Y74kalPqlfXlHTEmmwMHWGmnB82/I64FHXqU2QOjPUK
// SIG // RSdphndsOct8fjpkzhkXzMwLUBsgANOuXsb9IkDOR5b2
// SIG // 5jrFUfo0C0eH58J66eiQlsc9bnhctHaE5xZKGYv1n+Ot
// SIG // O3zA0ownE+LvnEX1ejUaOWJp6lEy9vvQxrBOKZ07vCb+
// SIG // WxI3XK9moP5N/yaci73hUKRtdykpqbYNdpzonDuCFLRK
// SIG // PBFRPrguQK9SvHijXn0g3lX9WQSqzpzTv1dUBOjF2Y/N
// SIG // 4W2EYnBADG7+hG8+wC/gjnMLdGLWvcaaTiU+ITNDLaH4
// SIG // rlMkayJjkI7RETBcRNxZiq+wJ7yMCjxzjo+33njjgLNJ
// SIG // aatyXA55aijNcTH7f/PIimwxghqpMIIapQIBATB9MGkx
// SIG // CzAJBgNVBAYTAlVTMRcwFQYDVQQKEw5EaWdpQ2VydCwg
// SIG // SW5jLjFBMD8GA1UEAxM4RGlnaUNlcnQgVHJ1c3RlZCBH
// SIG // NCBDb2RlIFNpZ25pbmcgUlNBNDA5NiBTSEEzODQgMjAy
// SIG // MSBDQTECEAtQzyRrJj79hacpMVFY8/8wDQYJYIZIAWUD
// SIG // BAIBBQCggYQwGAYKKwYBBAGCNwIBDDEKMAigAoAAoQKA
// SIG // ADAZBgkqhkiG9w0BCQMxDAYKKwYBBAGCNwIBBDAcBgor
// SIG // BgEEAYI3AgELMQ4wDAYKKwYBBAGCNwIBFTAvBgkqhkiG
// SIG // 9w0BCQQxIgQgTu40+Hev5OWVJmGfbkHhnmyU7orsPgYm
// SIG // IDMhh/jGdyAwDQYJKoZIhvcNAQEBBQAEggIAcgvGH1DM
// SIG // dVySt5/sbQGCoY+29D+oGFiF1N6EVk9b3Ou8iwyO3eq2
// SIG // HAkz74sf/n0rQDKaARflnYzeGCKTofpAYSNBdwkrllGe
// SIG // p31ilDDoQhxxoL/TSkhhKBm4sF2D8QVpP3gRYcFYbagt
// SIG // Q9DrOgsFsxaT0TGUH4xhG9QZaGPaPjeB1gzxBbxOpUOv
// SIG // vz2eVsuRFw0aVKxOdpStdrB7liwFTdN9yp8dRSp3HIm6
// SIG // blKkTGREe90MZ4egQGU6uyFsnOZYqY/mWO7QSXbBv1wz
// SIG // ZH54KXVT2u30yEvtmI5Ydhi/RKmFEUZ2iCIlw4JRdal3
// SIG // 4cm1HjjPGDgo8bx3pxAfi6KYGXpDciJDnp5WggtGA60+
// SIG // v9KkP5+HHjU777+GPpTq3bHma5FSP7/bnauVyAVJxREu
// SIG // ynRy1WqgCmBkWc4fPAOS/FzPUqds1LH7sytDrRSK4CBG
// SIG // hxbWHcWH2j0wO3bYHkuH2IpASIN1dIFo0qiPtjKWTTKW
// SIG // lGU5+Ytq9nHF+FwVjD8S5GVO45IY4eEUL8WUNr0RDI13
// SIG // eyu7qhk7rPqylgwM5nXXVUiIXl3D4XEEJfPRnHzSsBcp
// SIG // K3KftSEMor84HTEDlBX85OWP++QpZJBbPMosrO2g75Uq
// SIG // ah7920z1XnDOJbSyeZtUaMtyXPhXHjHD+7ti3MOrvNnX
// SIG // 6Jm11T35uv2hjU6hghd2MIIXcgYKKwYBBAGCNwMDATGC
// SIG // F2IwghdeBgkqhkiG9w0BBwKgghdPMIIXSwIBAzEPMA0G
// SIG // CWCGSAFlAwQCAQUAMHcGCyqGSIb3DQEJEAEEoGgEZjBk
// SIG // AgEBBglghkgBhv1sBwEwMTANBglghkgBZQMEAgEFAAQg
// SIG // 788dg0hTKYv42pwH9KQAqLjLicqwlomdcbVfZoa/rcAC
// SIG // EHIWX4K93oQW8kOg5ywNRZ4YDzIwMjYwNzA4MTgyNjA4
// SIG // WqCCEzowggbtMIIE1aADAgECAhAKgO8YS43xBYLRxHan
// SIG // lXRoMA0GCSqGSIb3DQEBCwUAMGkxCzAJBgNVBAYTAlVT
// SIG // MRcwFQYDVQQKEw5EaWdpQ2VydCwgSW5jLjFBMD8GA1UE
// SIG // AxM4RGlnaUNlcnQgVHJ1c3RlZCBHNCBUaW1lU3RhbXBp
// SIG // bmcgUlNBNDA5NiBTSEEyNTYgMjAyNSBDQTEwHhcNMjUw
// SIG // NjA0MDAwMDAwWhcNMzYwOTAzMjM1OTU5WjBjMQswCQYD
// SIG // VQQGEwJVUzEXMBUGA1UEChMORGlnaUNlcnQsIEluYy4x
// SIG // OzA5BgNVBAMTMkRpZ2lDZXJ0IFNIQTI1NiBSU0E0MDk2
// SIG // IFRpbWVzdGFtcCBSZXNwb25kZXIgMjAyNSAxMIICIjAN
// SIG // BgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA0EasLRLG
// SIG // ntDqrmBWsytXum9R/4ZwCgHfyjfMGUIwYzKomd8U1nH7
// SIG // C8Dr0cVMF3BsfAFI54um8+dnxk36+jx0Tb+k+87H9WPx
// SIG // NyFPJIDZHhAqlUPt281mHrBbZHqRK71Em3/hCGC5Kyyn
// SIG // eqiZ7syvFXJ9A72wzHpkBaMUNg7MOLxI6E9RaUueHTQK
// SIG // WXymOtRwJXcrcTTPPT2V1D/+cFllESviH8YjoPFvZSjK
// SIG // s3SKO1QNUdFd2adw44wDcKgH+JRJE5Qg0NP3yiSyi5Mx
// SIG // gU6cehGHr7zou1znOM8odbkqoK+lJ25LCHBSai25CFyD
// SIG // 23DZgPfDrJJJK77epTwMP6eKA0kWa3osAe8fcpK40uhk
// SIG // tzUd/Yk0xUvhDU6lvJukx7jphx40DQt82yepyekl4i0r
// SIG // 8OEps/FNO4ahfvAk12hE5FVs9HVVWcO5J4dVmVzix4A7
// SIG // 7p3awLbr89A90/nWGjXMGn7FQhmSlIUDy9Z2hSgctaep
// SIG // ZTd0ILIUbWuhKuAeNIeWrzHKYueMJtItnj2Q+aTyLLKL
// SIG // M0MheP/9w6CtjuuVHJOVoIJ/DtpJRE7Ce7vMRHoRon4C
// SIG // WIvuiNN1Lk9Y+xZ66lazs2kKFSTnnkrT3pXWETTJkhd7
// SIG // 6CIDBbTRofOsNyEhzZtCGmnQigpFHti58CSmvEyJcAlD
// SIG // VcKacJ+A9/z7eacCAwEAAaOCAZUwggGRMAwGA1UdEwEB
// SIG // /wQCMAAwHQYDVR0OBBYEFOQ7/PIx7f391/ORcWMZUEPP
// SIG // YYzoMB8GA1UdIwQYMBaAFO9vU0rp5AZ8esrikFb2L9RJ
// SIG // 7MtOMA4GA1UdDwEB/wQEAwIHgDAWBgNVHSUBAf8EDDAK
// SIG // BggrBgEFBQcDCDCBlQYIKwYBBQUHAQEEgYgwgYUwJAYI
// SIG // KwYBBQUHMAGGGGh0dHA6Ly9vY3NwLmRpZ2ljZXJ0LmNv
// SIG // bTBdBggrBgEFBQcwAoZRaHR0cDovL2NhY2VydHMuZGln
// SIG // aWNlcnQuY29tL0RpZ2lDZXJ0VHJ1c3RlZEc0VGltZVN0
// SIG // YW1waW5nUlNBNDA5NlNIQTI1NjIwMjVDQTEuY3J0MF8G
// SIG // A1UdHwRYMFYwVKBSoFCGTmh0dHA6Ly9jcmwzLmRpZ2lj
// SIG // ZXJ0LmNvbS9EaWdpQ2VydFRydXN0ZWRHNFRpbWVTdGFt
// SIG // cGluZ1JTQTQwOTZTSEEyNTYyMDI1Q0ExLmNybDAgBgNV
// SIG // HSAEGTAXMAgGBmeBDAEEAjALBglghkgBhv1sBwEwDQYJ
// SIG // KoZIhvcNAQELBQADggIBAGUqrfEcJwS5rmBB7NEIRJ5j
// SIG // QHIh+OT2Ik/bNYulCrVvhREafBYF0RkP2AGr181o2YWP
// SIG // oSHz9iZEN/FPsLSTwVQWo2H62yGBvg7ouCODwrx6ULj6
// SIG // hYKqdT8wv2UV+Kbz/3ImZlJ7YXwBD9R0oU62PtgxOao8
// SIG // 72bOySCILdBghQ/ZLcdC8cbUUO75ZSpbh1oipOhcUT8l
// SIG // D8QAGB9lctZTTOJM3pHfKBAEcxQFoHlt2s9sXoxFizTe
// SIG // HihsQyfFg5fxUFEp7W42fNBVN4ueLaceRf9Cq9ec1v5i
// SIG // QMWTFQa0xNqItH3CPFTG7aEQJmmrJTV3Qhtfparz+BW6
// SIG // 0OiMEgV5GWoBy4RVPRwqxv7Mk0Sy4QHs7v9y69NBqycz
// SIG // 0BZwhB9WOfOu/CIJnzkQTwtSSpGGhLdjnQ4eBpjtP+XB
// SIG // 3pQCtv4E5UCSDag6+iX8MmB10nfldPF9SVD7weCC3yXZ
// SIG // i/uuhqdwkgVxuiMFzGVFwYbQsiGnoa9F5AaAyBjFBtXV
// SIG // LcKtapnMG3VH3EmAp/jsJ3FVF3+d1SVDTmjFjLbNFZUW
// SIG // MXuZyvgLfgyPehwJVxwC+UpX2MSey2ueIu9THFVkT+um
// SIG // 1vshETaWyQo8gmBto/m3acaP9QsuLj3FNwFlTxq25+T4
// SIG // QwX9xa6ILs84ZPvmpovq90K8eWyG2N01c4IhSOxqt81n
// SIG // MIIGtDCCBJygAwIBAgIQDcesVwX/IZkuQEMiDDpJhjAN
// SIG // BgkqhkiG9w0BAQsFADBiMQswCQYDVQQGEwJVUzEVMBMG
// SIG // A1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3d3cu
// SIG // ZGlnaWNlcnQuY29tMSEwHwYDVQQDExhEaWdpQ2VydCBU
// SIG // cnVzdGVkIFJvb3QgRzQwHhcNMjUwNTA3MDAwMDAwWhcN
// SIG // MzgwMTE0MjM1OTU5WjBpMQswCQYDVQQGEwJVUzEXMBUG
// SIG // A1UEChMORGlnaUNlcnQsIEluYy4xQTA/BgNVBAMTOERp
// SIG // Z2lDZXJ0IFRydXN0ZWQgRzQgVGltZVN0YW1waW5nIFJT
// SIG // QTQwOTYgU0hBMjU2IDIwMjUgQ0ExMIICIjANBgkqhkiG
// SIG // 9w0BAQEFAAOCAg8AMIICCgKCAgEAtHgx0wqYQXK+PEbA
// SIG // HKx126NGaHS0URedTa2NDZS1mZaDLFTtQ2oRjzUXMmxC
// SIG // qvkbsDpz4aH+qbxeLho8I6jY3xL1IusLopuW2qftJYJa
// SIG // DNs1+JH7Z+QdSKWM06qchUP+AbdJgMQB3h2DZ0Mal5kY
// SIG // p77jYMVQXSZH++0trj6Ao+xh/AS7sQRuQL37QXbDhAkt
// SIG // VJMQbzIBHYJBYgzWIjk8eDrYhXDEpKk7RdoX0M980EpL
// SIG // tlrNyHw0Xm+nt5pnYJU3Gmq6bNMI1I7Gb5IBZK4ivbVC
// SIG // iZv7PNBYqHEpNVWC2ZQ8BbfnFRQVESYOszFI2Wv82wnJ
// SIG // RfN20VRS3hpLgIR4hjzL0hpoYGk81coWJ+KdPvMvaB0W
// SIG // kE/2qHxJ0ucS638ZxqU14lDnki7CcoKCz6eum5A19WZQ
// SIG // HkqUJfdkDjHkccpL6uoG8pbF0LJAQQZxst7VvwDDjAmS
// SIG // FTUms+wV/FbWBqi7fTJnjq3hj0XbQcd8hjj/q8d6ylgx
// SIG // CZSKi17yVp2NL+cnT6Toy+rN+nM8M7LnLqCrO2JP3oW/
// SIG // /1sfuZDKiDEb1AQ8es9Xr/u6bDTnYCTKIsDq1BtmXUqE
// SIG // G1NqzJKS4kOmxkYp2WyODi7vQTCBZtVFJfVZ3j7OgWmn
// SIG // hFr4yUozZtqgPrHRVHhGNKlYzyjlroPxul+bgIspzOwb
// SIG // tmsgY1MCAwEAAaOCAV0wggFZMBIGA1UdEwEB/wQIMAYB
// SIG // Af8CAQAwHQYDVR0OBBYEFO9vU0rp5AZ8esrikFb2L9RJ
// SIG // 7MtOMB8GA1UdIwQYMBaAFOzX44LScV1kTN8uZz/nupiu
// SIG // HA9PMA4GA1UdDwEB/wQEAwIBhjATBgNVHSUEDDAKBggr
// SIG // BgEFBQcDCDB3BggrBgEFBQcBAQRrMGkwJAYIKwYBBQUH
// SIG // MAGGGGh0dHA6Ly9vY3NwLmRpZ2ljZXJ0LmNvbTBBBggr
// SIG // BgEFBQcwAoY1aHR0cDovL2NhY2VydHMuZGlnaWNlcnQu
// SIG // Y29tL0RpZ2lDZXJ0VHJ1c3RlZFJvb3RHNC5jcnQwQwYD
// SIG // VR0fBDwwOjA4oDagNIYyaHR0cDovL2NybDMuZGlnaWNl
// SIG // cnQuY29tL0RpZ2lDZXJ0VHJ1c3RlZFJvb3RHNC5jcmww
// SIG // IAYDVR0gBBkwFzAIBgZngQwBBAIwCwYJYIZIAYb9bAcB
// SIG // MA0GCSqGSIb3DQEBCwUAA4ICAQAXzvsWgBz+Bz0RdnEw
// SIG // vb4LyLU0pn/N0IfFiBowf0/Dm1wGc/Do7oVMY2mhXZXj
// SIG // DNJQa8j00DNqhCT3t+s8G0iP5kvN2n7Jd2E4/iEIUBO4
// SIG // 1P5F448rSYJ59Ib61eoalhnd6ywFLerycvZTAz40y8S4
// SIG // F3/a+Z1jEMK/DMm/axFSgoR8n6c3nuZB9BfBwAQYK9FH
// SIG // aoq2e26MHvVY9gCDA/JYsq7pGdogP8HRtrYfctSLANEB
// SIG // fHU16r3J05qX3kId+ZOczgj5kjatVB+NdADVZKON/gnZ
// SIG // ruMvNYY2o1f4MXRJDMdTSlOLh0HCn2cQLwQCqjFbqrXu
// SIG // vTPSegOOzr4EWj7PtspIHBldNE2K9i697cvaiIo2p61E
// SIG // d2p8xMJb82Yosn0z4y25xUbI7GIN/TpVfHIqQ6Ku/qjT
// SIG // Y6hc3hsXMrS+U0yy+GWqAXam4ToWd2UQ1KYT70kZjE4Y
// SIG // tL8Pbzg0c1ugMZyZZd/BdHLiRu7hAWE6bTEm4XYRkA6T
// SIG // l4KSFLFk43esaUeqGkH/wyW4N7OigizwJWeukcyIPbAv
// SIG // jSabnf7+Pu0VrFgoiovRDiyx3zEdmcif/sYQsfch28bZ
// SIG // eUz2rtY/9TCA6TD8dC3JE3rYkrhLULy7Dc90G6e8Blqm
// SIG // yIjlgp2+VqsS9/wQD7yFylIz0scmbKvFoW2jNrbM1pD2
// SIG // T7m3XDCCBY0wggR1oAMCAQICEA6bGI750C3n79tQ4ghA
// SIG // GFowDQYJKoZIhvcNAQEMBQAwZTELMAkGA1UEBhMCVVMx
// SIG // FTATBgNVBAoTDERpZ2lDZXJ0IEluYzEZMBcGA1UECxMQ
// SIG // d3d3LmRpZ2ljZXJ0LmNvbTEkMCIGA1UEAxMbRGlnaUNl
// SIG // cnQgQXNzdXJlZCBJRCBSb290IENBMB4XDTIyMDgwMTAw
// SIG // MDAwMFoXDTMxMTEwOTIzNTk1OVowYjELMAkGA1UEBhMC
// SIG // VVMxFTATBgNVBAoTDERpZ2lDZXJ0IEluYzEZMBcGA1UE
// SIG // CxMQd3d3LmRpZ2ljZXJ0LmNvbTEhMB8GA1UEAxMYRGln
// SIG // aUNlcnQgVHJ1c3RlZCBSb290IEc0MIICIjANBgkqhkiG
// SIG // 9w0BAQEFAAOCAg8AMIICCgKCAgEAv+aQc2jeu+RdSjww
// SIG // IjBpM+zCpyUuySE98orYWcLhKac9WKt2ms2uexuEDcQw
// SIG // H/MbpDgW61bGl20dq7J58soR0uRf1gU8Ug9SH8aeFaV+
// SIG // vp+pVxZZVXKvaJNwwrK6dZlqczKU0RBEEC7fgvMHhOZ0
// SIG // O21x4i0MG+4g1ckgHWMpLc7sXk7Ik/ghYZs06wXGXuxb
// SIG // Grzryc/NrDRAX7F6Zu53yEioZldXn1RYjgwrt0+nMNlW
// SIG // 7sp7XeOtyU9e5TXnMcvak17cjo+A2raRmECQecN4x7ax
// SIG // xLVqGDgDEI3Y1DekLgV9iPWCPhCRcKtVgkEy19sEcypu
// SIG // kQF8IUzUvK4bA3VdeGbZOjFEmjNAvwjXWkmkwuapoGfd
// SIG // pCe8oU85tRFYF/ckXEaPZPfBaYh2mHY9WV1CdoeJl2l6
// SIG // SPDgohIbZpp0yt5LHucOY67m1O+SkjqePdwA5EUlibaa
// SIG // RBkrfsCUtNJhbesz2cXfSwQAzH0clcOP9yGyshG3u3/y
// SIG // 1YxwLEFgqrFjGESVGnZifvaAsPvoZKYz0YkH4b235kOk
// SIG // GLimdwHhD5QMIR2yVCkliWzlDlJRR3S+Jqy2QXXeeqxf
// SIG // jT/JvNNBERJb5RBQ6zHFynIWIgnffEx1P2PsIV/EIFFr
// SIG // b7GrhotPwtZFX50g/KEexcCPorF+CiaZ9eRpL5gdLfXZ
// SIG // qbId5RsCAwEAAaOCATowggE2MA8GA1UdEwEB/wQFMAMB
// SIG // Af8wHQYDVR0OBBYEFOzX44LScV1kTN8uZz/nupiuHA9P
// SIG // MB8GA1UdIwQYMBaAFEXroq/0ksuCMS1Ri6enIZ3zbcgP
// SIG // MA4GA1UdDwEB/wQEAwIBhjB5BggrBgEFBQcBAQRtMGsw
// SIG // JAYIKwYBBQUHMAGGGGh0dHA6Ly9vY3NwLmRpZ2ljZXJ0
// SIG // LmNvbTBDBggrBgEFBQcwAoY3aHR0cDovL2NhY2VydHMu
// SIG // ZGlnaWNlcnQuY29tL0RpZ2lDZXJ0QXNzdXJlZElEUm9v
// SIG // dENBLmNydDBFBgNVHR8EPjA8MDqgOKA2hjRodHRwOi8v
// SIG // Y3JsMy5kaWdpY2VydC5jb20vRGlnaUNlcnRBc3N1cmVk
// SIG // SURSb290Q0EuY3JsMBEGA1UdIAQKMAgwBgYEVR0gADAN
// SIG // BgkqhkiG9w0BAQwFAAOCAQEAcKC/Q1xV5zhfoKN0Gz22
// SIG // Ftf3v1cHvZqsoYcs7IVeqRq7IviHGmlUIu2kiHdtvRoU
// SIG // 9BNKei8ttzjv9P+Aufih9/Jy3iS8UgPITtAq3votVs/5
// SIG // 9PesMHqai7Je1M/RQ0SbQyHrlnKhSLSZy51PpwYDE3cn
// SIG // RNTnf+hZqPC/Lwum6fI0POz3A8eHqNJMQBk1RmppVLC4
// SIG // oVaO7KTVPeix3P0c2PR3WlxUjG/voVA9/HYJaISfb8rb
// SIG // II01YBwCA8sgsKxYoA5AY8WYIsGyWfVVa88nq2x2zm8j
// SIG // LfR+cWojayL/ErhULSd+2DrZ8LaHlv1b0VysGMNNn3O3
// SIG // AamfV6peKOK5lDGCA3wwggN4AgEBMH0waTELMAkGA1UE
// SIG // BhMCVVMxFzAVBgNVBAoTDkRpZ2lDZXJ0LCBJbmMuMUEw
// SIG // PwYDVQQDEzhEaWdpQ2VydCBUcnVzdGVkIEc0IFRpbWVT
// SIG // dGFtcGluZyBSU0E0MDk2IFNIQTI1NiAyMDI1IENBMQIQ
// SIG // CoDvGEuN8QWC0cR2p5V0aDANBglghkgBZQMEAgEFAKCB
// SIG // 0TAaBgkqhkiG9w0BCQMxDQYLKoZIhvcNAQkQAQQwHAYJ
// SIG // KoZIhvcNAQkFMQ8XDTI2MDcwODE4MjYwOFowKwYLKoZI
// SIG // hvcNAQkQAgwxHDAaMBgwFgQU3WIwrIYKLTBr2jixaHlS
// SIG // MAf7QX4wLwYJKoZIhvcNAQkEMSIEIPlU92/dgXnql46k
// SIG // zX1+vFc2j5f6/AyBqjpkMy3Q3OsKMDcGCyqGSIb3DQEJ
// SIG // EAIvMSgwJjAkMCIEIEqgP6Is11yExVyTj4KOZ2ucrsqz
// SIG // P+NtJpqjNPFGEQozMA0GCSqGSIb3DQEBAQUABIICACPM
// SIG // GPWILDoaH1KQKi8O3i3//9CjdDhDozpsKQz0unINjYuT
// SIG // dc5PnpvVXYgFtbaeom/PZ5T+3vy0GuDKOVEXxSiCvggQ
// SIG // QErT22YA03nLZQBMyboakuxrCLAf4zLvQARbxhAOpKlq
// SIG // UHCri0H4lo7+T3HGFav0U1mixk4vBn/ea1ppQ6I+OFd4
// SIG // oXg2iipeO8MLmdH5AnphIX1h/cjrW9RWjXzd3xdVeUPq
// SIG // 5pCwaVlM0e9CvDuMYvWT2e0v0qr0EWXx9NUF4dy6CruD
// SIG // z6C4D0Gtkt162+ENbqoWsVGQH1695enGKopPr1FBjtGR
// SIG // aauxm/fec2KzSQcyevmM2zRYAyeWYLnEOGQygYyDg9jZ
// SIG // f5rcHUrCRMXwMHmjgUrzYjmDYtm/A22EbvMBVFaewn/D
// SIG // 9LnuD5rDPYflKFE3q2ZM57rNw64qOKlYv1PKdA/rF2SX
// SIG // Et3ty5OWgXB3F60MCUcbllgkk6Kxqvilbo8RkM07I6MO
// SIG // SOh2ej4P8clTBtea8ZrJFJZCix3U/d15CjwIp+S3w80r
// SIG // v7IkuGZEGMfLck8rby8L+jhhCIvlWNwdZeaCpvbm7IWQ
// SIG // 4PiX58otm4Ui6ziCoBB79hOBV0OVHiYnfpKcCAnWIUwT
// SIG // ijdyVhNdwKXpZEDl4TE9FCauinfO0LYTb20O25GRKg8x
// SIG // lVh2Ty4FX/ukYG/H5hCX
// SIG // End signature block
