
Đây là file trình bày minh chứng cho delete invalid user dựa trên ID của user (bao gôm: Id không tồn tại hoặc ID không đúng định dạng (malformed ID))

# Tóm tắt các câu lệnh/API đã gọi và nhận xét đi kèm
Quá trình thực thi test case **BVA-TC-FR19-06** phơi bày một thiết kế API có phần cẩu thả và thiếu chặt chẽ từ phía Backend, bất chấp việc hệ thống may mắn bảo toàn được dữ liệu thực tế.

## Tóm tắt quá trình thực thi

1. **Kiểm tra trạng thái gốc (`GET /admin/users`):** Cơ sở dữ liệu ghi nhận có 3 user hợp lệ với ID là 2, 4 và 5.
2. **Xóa ID không tồn tại (`DELETE .../999999`):** Hệ thống chấp nhận request và trả về mã `HTTP 200 OK`.
3. **Xóa ID hoàn toàn sai định dạng (`DELETE .../abc`):** Trái với kỳ vọng báo lỗi, hệ thống vẫn trả về `HTTP 200 OK` kèm theo thông báo khẳng định chắc nịch: `{"message":"User deleted"}`.
4. **Xóa ID sai định dạng hỗn hợp (`DELETE .../1abc`):** Tình trạng tương tự tái diễn, API tiếp tục trả về `HTTP 200 OK`.
5. **Nghiệm thu hệ thống (`GET /admin/users`):** Danh sách user vẫn nguyên vẹn (ID 2, 4, 5). Hành vi xóa thực tế bị vô hiệu (no-op).

**Đánh giá trạng thái (Status):** **FAILED**
Kỳ vọng của test case là hệ thống phải ghi nhận lỗi (Error) nhưng API lại trả về phản hồi thành công (200 OK).

## Phân tích rủi ro hệ thống

Việc API không xóa nhầm user chỉ là kết quả của việc cơ sở dữ liệu ngầm từ chối câu lệnh truy vấn vô lý, chứ không xuất phát từ việc logic code được kiểm soát an toàn.

* **Thủng tầng Input Validation:** Backend không thực hiện xác thực kiểu dữ liệu (type casting/validation) ở tầng controller. Một endpoint đạt chuẩn phải ngay lập tức chặn các chuỗi như `abc` hoặc `1abc` và bẻ lái thành `400 Bad Request` trước khi request kịp chạm đến tầng xử lý dữ liệu.
* **Tạo dữ liệu rác bằng False Positive:** Việc trả về `HTTP 200` và `{"message":"User deleted"}` cho mọi trường hợp lỗi là một vi phạm nghiêm trọng về tính toàn vẹn tín hiệu. Các client (như frontend, hệ thống log, hoặc các microservice khác) sẽ bị đánh lừa rằng thao tác đã diễn ra thành công, dẫn đến tình trạng sai lệch giao diện hoặc làm hỏng các luồng xử lý dây chuyền.
* **Vi phạm nguyên tắc RESTful:** Thao tác DELETE nhắm vào một định danh không tồn tại cần phản hồi `404 Not Found`. Trong kịch bản hệ thống được cố tình thiết kế theo hướng Idempotent (coi việc xóa một thứ không tồn tại là không có lỗi), API vẫn bắt buộc phải ném lỗi `400` cho các định dạng ID sai cú pháp.

Nhiều khả năng ở dưới tầng Data Access, developer đang bắt lỗi bằng một khối `try-catch` lỏng lẻo, hoặc không hề kiểm tra số lượng bản ghi thực tế bị tác động (rows affected = 0) sau khi chạy câu lệnh DELETE, dẫn đến việc mặc định gán mọi kết quả không văng lỗi runtime là "Thành công".


# Toàn bộ câu lệnh/API đã được gọi

```text

@BDCALM ➜ /workspaces/eshop-sut-for-HWork (main) $ BACKEND_URL="https://orange-disco-9775gp4r5rv6c757g-3000.app.github.dev/api"
@BDCALM ➜ /workspaces/eshop-sut-for-HWork (main) $ ADMIN_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzkyNDc4OTc5fQ.Ke4UvM-XbdR_gJRh9nfq7qkEzByEF_Lw5Sva055Cr3k"
@BDCALM ➜ /workspaces/eshop-sut-for-HWork (main) $ curl -i -sS \
  "$BACKEND_URL/admin/users" \
  -H "Authorization: Bearer $ADMIN_TOKEN"
HTTP/2 200 
date: Tue, 20 Oct 2026 07:31:19 GMT
content-type: application/json; charset=utf-8
content-length: 407
cache-control: no-cache,no-store
etag: W/"197-MR0zLSS1Z5O043x0y8p3eLHElsQ"
expires: Thu, 01 Jan 1970 00:00:00 GMT
pragma: no-cache
set-cookie: .Tunnels.Relay.WebForwarding.Cookies=CfDJ8NJJuTEdEi5KqensronCVW1P7ld6o1tMK6QwXbsPwt92DfTlz2-ipBVSwTrDFjZJKit4JtbcXAr0V0Exg1iwVgg9m8HeERZtgCwgUvEfrlQqu_EzusD-B1msxxPP08vhhGKf8yQVTrqZY0LZN-7zWRtTpi_LSiAzoLZXLUagOVV62HEVoi9jdStLOOS2XVBeeLunp89CQ211X94Zf2CmQyuxx_tRjZXOJtRFGuNMcZw-rDvQ9T8J6-LVgQttc9AHhqmq51lxiExDUF6avQDfgldWlc_Wnq_90unMo-qhszBqzISPl3vd6wyJQkMokxjW2e5JmVyH7hjGyV4jLc0u4mjhSswRVwab6zgOf08X2HqK2Dag9MNscEPgj2_icFRxyOuVTKI1cbWS_pqjPsbrtHKBCcRLupjrj_o18qlQnPM8K-4S8QhWR3KdUWNpuk8aAsjgps5ebAgrimusxYgO4H_HVIDgwGCi5Or6CKBs2TFo3aSZhybuXPD50W_hNJtrAWJ_XTNc0inYNj2wlGxvnCGGlEd715bZhDxBnsyyFr1YiNakf8oQBnTgMXH2hhYJi6CzkVN7OK8yMOH-WUIl7AslLfkP7SsWf7nbja_6mhUKswp2c8BUUnRDBASgoOY1i3Y-RULtBZbg37eDVg1rA2CDxcRbzEq7u9R8n5bxr-JgWa1zmPg91xad5Htp7SHj3jP7U0qaC9iSzNoR2EAAhrNb0o3gtRVs-MvrSc9VNbtroP8nnklobebzkcMZE9HdlhhttiWDSVlCsIcczV_bE9EUk6R0ps92Qc0mdiOk4lH7ShGjQFAKDIh4NuGMcA4jz8tviGFb4bJVBrBTUkZNQKKw85jURMHNRojIUnETL-TMg6HLyf_Bgfi4EBA0Ip4-XX27H5zPrmLu9Yure9Uv93jubZxTvVYTjmK1l29BRw58KQRfJMcN_5KtcaUg7DFJ93gzOIwt6e27ZeWWMHRwAhQDWzhXOPCdD5TcYsUV-C-cltr49M9uaZswwKk56NWjPA; path=/;secure; samesite=none; Partitioned
vary: Origin
x-content-type-options: nosniff
ratelimit-limit: HttpRequestRatePerPort:1500/m
ratelimit-remaining: HttpRequestRatePerPort:1499
ratelimit-reset: HttpRequestRatePerPort:58s
x-report-abuse: https://msrc.microsoft.com/report/abuse
x-ms-ratelimit-limit: 1500
x-ms-ratelimit-remaining: 1497
x-ms-ratelimit-used: 3
x-ms-ratelimit-reset: 0
x-powered-by: Express
x-robots-tag: noindex, nofollow
referrer-policy: same-origin
vssaas-request-id: e36c5f65-236b-4be1-819e-d44310858ee0
strict-transport-security: max-age=31536000; includeSubDomains
x-served-by: tunnels-prod-rel-asse-v3-cluster

[{"id":2,"name":"Test User","email":"test@eshop.com","role":"user","login_attempts":0,"locked_until":null,"shipping_address":null},{"id":4,"name":"Binh Duong 2","email":"dn0167772@gmail.com","role":"user","login_attempts":0,"locked_until":null,"shipping_address":null},{"id":5,"name":"Binh Duong 3","email":"dn0167773@gmail.com","role":"user","login_attempts":0,"@BDCALM ➜ /workspaces/eshop-sut-for-HWork (main) $ curl -i -sS -X DELETE \t-for-HWork (main) $ curl -i -sS -X DELETE \
  "$BACKEND_URL/admin/users/999999" \
  -H "Authorization: Bearer $ADMIN_TOKEN"
HTTP/2 200 
date: Tue, 20 Oct 2026 07:31:43 GMT
content-type: application/json; charset=utf-8
content-length: 26
cache-control: no-cache,no-store
etag: W/"1a-+BFCXZBji7vrbkrwyE5s2YKViik"
expires: Thu, 01 Jan 1970 00:00:00 GMT
pragma: no-cache
set-cookie: .Tunnels.Relay.WebForwarding.Cookies=CfDJ8NJJuTEdEi5KqensronCVW1aM7untLBk-InyO3C1b0ukm_ZN7M_wWaA0eWSoev7MlrybSne9mar705cHl3PsD4cqKGBo2a5VnaV4PB5Bb3XBI4lGeVEL4_ckGro64QWidtaSb0Qi-jb13gaF_FXPZ86MeZUDAd9OCuYw93kH2aCBVG669WvpwgmeJzGoCSwNVlzEXRlVVPrOZaNoiTaJLeQYLVCl7XtDoQoL9nCI7o5y72qhecj4ApSncxqjP7gqmBr25M51hVgyCGD3leT-imZ_Wfs2tR9eSj-25A54c9YqF2_f3jhGBFwIZS1KwfBtsKxa59S08QjTbdcAN-SQI4WQUY3QWps18PI4gVMF68wKi277CTu0yeDX7G7PkLSG2JiYBZHlP1Q_1oV-dPS_I_nE6rZua0x38Jf8QMmyehdULtxIDiAUq6nWUY_OwIXCC3_IFn0OK7FO4pHdSZPMLenaeA00N8J42soBWpr9um53Vj6czs_sQs0-SeyTiDxlRcmplvT5RK3SHRvGgapsq4IH1AT1-ZO979umdYHToKgO_jw_oBg7dHT_PGf2R5fZNUeJCLMXlpwOzyJPAN_cQDhIL8lGZMQNQYW_w262l67y4DoB9K7ErM8lpuFADThApAHf1NdwLzd1YoPJNvr-NBWcyT5ZfmN5nP0zdS1pTvb0owPHQiM1FQBekB3EAfHLvT4JRKljrGO1PNM4_GNYvZYS3zo7e1rb-aFnWrZcIKdeWt1Q8gM7K5zhcj-Fiii7yNHtN20Y0qYQyNJwAFY1pgxZZP2mDOD9xnpfvpomEdQLBw9M1AUcN53W7AOMDF69a1xcBs2aEUF2CDPwOyU9yv3z2tYbk4RBgBtj4AyxMtKzp5FISIbnFNeDFlhVP69s24KyoB1YUaOScz6zu5K1xrWYSLKbetPrm9AY7m0uODwDXLDvoXs85Khk3DAGQBaQW0MdYFsuA4OSWjSaVr3C7wqe9f7DKOOho4mFSSCGa2HrDzoBXX_SRT-vKmqohMMK9g; path=/;secure; samesite=none; Partitioned
vary: Origin
x-content-type-options: nosniff
ratelimit-limit: HttpRequestRatePerPort:1500/m
ratelimit-remaining: HttpRequestRatePerPort:1499
ratelimit-reset: HttpRequestRatePerPort:22s
x-report-abuse: https://msrc.microsoft.com/report/abuse
x-ms-ratelimit-limit: 1500
x-ms-ratelimit-remaining: 1496
x-ms-ratelimit-used: 4
x-ms-ratelimit-reset: 0
x-powered-by: Express
x-robots-tag: noindex, nofollow
referrer-policy: same-origin
vssaas-request-id: 41b72eef-baf3-4e5a-a4ae-f178f5d30110
strict-transport-security: max-age=31536000; includeSubDomains
x-served-by: tunnels-prod-rel-asse-v3-cluster

@BDCALM ➜ /workspaces/eshop-sut-for-HWork (main) $ curl -i -sS -X DELETE \ $ curl -i -sS -X DELETE \
  "$BACKEND_URL/admin/users/abc" \
  -H "Authorization: Bearer $ADMIN_TOKEN"
HTTP/2 200 
date: Tue, 20 Oct 2026 07:32:16 GMT
content-type: application/json; charset=utf-8
content-length: 26
cache-control: no-cache,no-store
etag: W/"1a-+BFCXZBji7vrbkrwyE5s2YKViik"
expires: Thu, 01 Jan 1970 00:00:00 GMT
pragma: no-cache
set-cookie: .Tunnels.Relay.WebForwarding.Cookies=CfDJ8NJJuTEdEi5KqensronCVW3bHCrDhu02SBko3mGc0HGLhCPa2Qn33o4MvKGoWjUUxChl-asJBi7-tAr_prkQvdF2_EQ0CCmddJ8V7IQr7ojthF3ppmYXp0lSiD7mO56RE9BBql3h3yT4u3ywMtLDnapC9pGfYcP4G7-sArCh0znUEWDYgTmHNaehAdPskNOxnVe7VrtGR23xYlJ6-uxoiS474g02VS6M2sO7tACT7JqjEaP8qyBhCIh3gMVcXjIHKMlSUe0G3Z_f73n1ay5BCFRfmEYVt7oddHo-MtZjXPBFEgXiZ8uZ9H6B2EnQoSTH7S_pWD8s1tSSxS8dVtsroh9jRIsK9BfnjAOM2Xt79GvYxvHO7X5hgXEhyz8sxSw6ukcixNuU7f6VOzaEb9nisURXEP5KKE3K6DH1J4pELHcvlUmDfXi2mkLtJ9lMZBt68ZghIqtGKp40TGWq_HklRipBBiS5hlutfHctvK9zFZeo6dFBibOVSjGNj7f5fS59oZe7PTeRM7hNTKP1tjf_-lwK_oTcg-ngYBcfg1wX6XTgdOWdioTWUIDD3eApUbGL-rzSYEQw6x2I9DgUxe8Bftt91z5KJnknn9p0Hfj4QrPROccyXBbbS1ukpYJRHiFesyBRPfbYsiAfyiETrD0sAabuyXkTn0BoJtNlprEax_bZoQ5O-aeKwa6950UyCxecybyGkE1brFzbydB99pszDWlj8K-jDIItFMb9D-z4xPDQO1puI90m2fNWY82ubCxohoRLgsOcuPN6g5FmBGQ2UWUHz8LK5PrI87rA-MIyWfYqOEVT_IYoWS9_5i8KC3xUQ1JWsT1tyj5RYGHLh32K2whbt-njydyMkzSKLhVafdVLHfzWFJgs_lNBfuknT6jYHqD-YRwhzv0jwEG2IOgmuf8iStqfK2sRhXMETbZ7dLjqdEXUqoD008Y_GJ3kMe0p-2VRYOc81A1Q3ih_KANkQbJcLIOyUF3MeIBJnCG2EieTPkbwAoSoKGPvmCk0JE9WtA; path=/;secure; samesite=none; Partitioned
vary: Origin
x-content-type-options: nosniff
ratelimit-limit: HttpRequestRatePerPort:1500/m
ratelimit-limit: ClientConnectionsPerPort: max 1000
ratelimit-remaining: HttpRequestRatePerPort:1499
ratelimit-remaining: ClientConnectionsPerPort:1000
ratelimit-reset: HttpRequestRatePerPort:49s
x-report-abuse: https://msrc.microsoft.com/report/abuse
x-ms-ratelimit-limit: 1500
x-ms-ratelimit-remaining: 1497
x-ms-ratelimit-used: 3
x-ms-ratelimit-reset: 0
x-powered-by: Express
x-robots-tag: noindex, nofollow
referrer-policy: same-origin
vssaas-request-id: 0281cb25-9ad0-4845-9219-8e2ba9f00a89
strict-transport-security: max-age=31536000; includeSubDomains
x-served-by: tunnels-prod-rel-asse-v3-cluster

{"message":"User deleted"}
@BDCALM ➜ /workspaces/eshop-sut-for-HWork (main) $ 
@BDCALM ➜ /workspaces/eshop-sut-for-HWork (main) $ curl -i -sS -X DELETE \
  "$BACKEND_URL/admin/users/1abc" \
  -H "Authorization: Bearer $ADMIN_TOKEN"
HTTP/2 200 
date: Tue, 20 Oct 2026 07:32:39 GMT
content-type: application/json; charset=utf-8
content-length: 26
cache-control: no-cache,no-store
etag: W/"1a-+BFCXZBji7vrbkrwyE5s2YKViik"
expires: Thu, 01 Jan 1970 00:00:00 GMT
pragma: no-cache
set-cookie: .Tunnels.Relay.WebForwarding.Cookies=CfDJ8NJJuTEdEi5KqensronCVW1VW_AdpVLZxzlPxsm20HQYkD7q-Aiqs2Kn2mTiJmL8j7sgZA6zR9di-O-6errJ6SNmJmkLgoYhJY9bxZNXdfw1zmGFuSkkZedxGGcaBVyOONOmT8INxocINq1xUhOzxXeWyj1bsld0R6mbUt7H8yuShTAUq5GdQNxBg3nomzv50huxKVQf8QflM4WfOtMDhj22-ffcMv9q999IOTkOnXkyVXt29xDfTQE2o8YjkN-caSf8EgKONKmYUxFQW3N1avEmpAmvcH9PigeGng4ubKH187bKQTpbQfbYSbNTboNYp86z09Ok8grvNMOAzRMLRpVW5D9930vXaNkqa-JO9I478NjXDwHR1B9iU8sW05L-CuoRy4ThaPZf7ze70SMhGWEdxnrB2uuB9fNwCwavV7dq1ESCuFLwhBrXNE1zviG0Vym_1Lo4h1LSpzYpUDvihfvmwiiMjmIG587Fr7mw2PjoN0SX8yqQl-GkW2avNN212fMGEC3b_bPh93Hq_wE2IFDkZ6-ZJUjg2tr8meh30VORPe8IlpA3PvTb15l8FF1BWDpLM_L3GaUKKtQtOHPGCP3vecPvT4A_CdECuUMeVTxPMdCo6-7X6DCFEytJxEKddetuEA7zgXbiYSbezAOtBlkqrfGirzh3mJ7Dn9OkbdZ4GAz98WiTukAHiKEKBAtvFl_L4X-EFmkGPn52M2kGysQ5GWO93iyCvxZkPsCJDqDQsJPhAhB3tuiuPyWyR-klBjRhHh6g8y27YGXNnaE3vskOEbHtURe_zF8Uy2yXsOzCCIxpXrgblZg7ae6X4Nv1uDrno5Wvdi_J8iWwJ-qJVn4hyIOUCCvmP6-l1CVqOIFSlNdK_ez-bOTBoyRCHwUH8eSM6CwRslJRRPAjA0wuqOe0Rjr98SU6UccsdsRWP3jW3k01tGwULZbHDm5-QmVTOd_9Iz31XMZjgGM2sfPVma4Lmwtn8WXcTafA1TlvwO8YlIOogrDAcCxyrFHEa-Y0mA; path=/;secure; samesite=none; Partitioned
vary: Origin
x-content-type-options: nosniff
ratelimit-limit: HttpRequestRatePerPort:1500/m
ratelimit-remaining: HttpRequestRatePerPort:1499
ratelimit-reset: HttpRequestRatePerPort:18s
x-report-abuse: https://msrc.microsoft.com/report/abuse
x-ms-ratelimit-limit: 1500
x-ms-ratelimit-remaining: 1496
x-ms-ratelimit-used: 4
x-ms-ratelimit-reset: 0
x-powered-by: Express
x-robots-tag: noindex, nofollow
referrer-policy: same-origin
vssaas-request-id: 49ea7cd9-e6d8-4375-a98e-2663082e0041
strict-transport-security: max-age=31536000; includeSubDomains
x-served-by: tunnels-prod-rel-asse-v3-cluster

@BDCALM ➜ /workspaces/eshop-sut-for-HWork (main) $ curl -i -sS \ork (main) $ curl -i -sS \
  "$BACKEND_URL/admin/users" \
  -H "Authorization: Bearer $ADMIN_TOKEN"
HTTP/2 200 
date: Tue, 20 Oct 2026 07:32:45 GMT
content-type: application/json; charset=utf-8
content-length: 407
cache-control: no-cache,no-store
etag: W/"197-MR0zLSS1Z5O043x0y8p3eLHElsQ"
expires: Thu, 01 Jan 1970 00:00:00 GMT
pragma: no-cache
set-cookie: .Tunnels.Relay.WebForwarding.Cookies=CfDJ8NJJuTEdEi5KqensronCVW16Bs5LtiUaz2xhoCEPfdcicUBsSlJBjK58BS_wOOvxcOmIYOAeqZJ2rTVFfnRuFnTCq19Y9F3iokzDjFouTMrcFgQslf08DzrkpNrvKMJqgNDOZa4J-g1xbClf-uQqmhVdz5zlT7CYsOEcleQZXluCZWvsnQD1s1f0I-miN0oll6uMgBRa6XCsaI2ipAYiI2ToecNHuj6tMIpNLlOxhh3ry2RNBGjMOYW_QeYGwYdy_AtA7W4YznZOAzw5R9InDxVhhbgUjwo7L8dewg1k0IBT6CsduVbwI_qfGsPCCDabPXWOR_DpkQakdb4SlY7rCm7dL3RyYW60l1_DW1PiwtUVAWV1qEAPVY1wu4mWHs9Hua0VW9VvDLupWzATYUbCY0yT-DJaXrbYf7DVB9pTA7o86aN36WSSf87Ch-IwQxc50k3611vTmCMK0rgdpUkw555BxoN4nlyqOHqok07n7VH_VUJ_2lgS7zlxZH2wCf7qO3fnQ3uXOceUf5P7HzaOCv_RrkYFG4cHmeMrxcXTe8W6LQhi2qyFIkaDqN80IPsOoq_63oXvbIepXVxfXtibUXejsQjNAjlZHKFfs_aTpcAiYWB7hgYtrISKxvvQKZSPpF6wDmNTBz4KtlIbVECzUggm8FmYXQ6MiavYh9WXSZe-9Z-_eeUYJ1t5-etYLddsyhwO4KYTcLFTw1V93GSuBfrCcPxbbXOiRxVfLQXSN7yxTK8f_rwSgXHA64piUccBqFQX27UnAepaIVa7LZEVxRHfc_COGoO0rd_-FggZFbJFJpTHav0d4PuR6I_C9_vs-oOR32CwJKbz_-yYMVcDpaw1N1OTt_wY8HC8fNaWV9CiR07mQ0RNENHvvku1WiPfWn-M8yQz8zXBVpO5LaTu7pJgO4hOc6YidF5u_hNiJElDrUghVkpQq6ILya0aE6AGobPIr1jaOF6c60LKwsv05sUjkt8NCiUJ3JZoy9AxmaYzo1wngkcGwoHos2UxVfhedQ; path=/;secure; samesite=none; Partitioned
vary: Origin
x-content-type-options: nosniff
ratelimit-limit: HttpRequestRatePerPort:1500/m
ratelimit-limit: ClientConnectionsPerPort
ratelimit-remaining: HttpRequestRatePerPort:1498
ratelimit-reset: HttpRequestRatePerPort:20s
x-report-abuse: https://msrc.microsoft.com/report/abuse
x-ms-ratelimit-limit: 1500
x-ms-ratelimit-remaining: 1497
x-ms-ratelimit-used: 3
x-ms-ratelimit-reset: 0
x-powered-by: Express
x-robots-tag: noindex, nofollow
referrer-policy: same-origin
vssaas-request-id: daa2b51a-9455-4bd7-b06c-df9bad650ddc
strict-transport-security: max-age=31536000; includeSubDomains
x-served-by: tunnels-prod-rel-asse-v3-cluster

[{"id":2,"name":"Test User","email":"test@eshop.com","role":"user","login_attempts":0,"locked_until":null,"shipping_address":null},{"id":4,"name":"Binh Duong 2","email":"dn0167772@gmail.com","role":"user","login_attempts":0,"locked_until":null,"shipping_address":null},{"id":5,"name":"Binh Duong 3","email":"dn0167773@gmail.com","role":"user","login_attempts":0,"

```
