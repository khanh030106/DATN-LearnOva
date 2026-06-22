package com.example.back_end.controller.admin;

import com.example.back_end.dto.resquest.admin.VoucherRequest;
import com.example.back_end.dto.response.admin.VoucherResponse;
import com.example.back_end.service.admin.VoucherService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/learnova/admin/vouchers")
public class VoucherController {

    private final VoucherService voucherService;

    public VoucherController(VoucherService voucherService) {
        this.voucherService = voucherService;
    }

    @GetMapping
    public List<VoucherResponse> getAllVouchers() {
        return voucherService.getAllVouchers();
    }

    @GetMapping("/{voucherId}")
    public VoucherResponse getVoucherById(@PathVariable Long voucherId) {
        return voucherService.getVoucherById(voucherId);
    }

    @PostMapping("/create")
    public VoucherResponse createVoucher(@RequestBody VoucherRequest voucherRequest) {
        return voucherService.createVoucher(voucherRequest);
    }

    @PutMapping("/update/{voucherId}")
    public VoucherResponse updateVoucher(
            @PathVariable Long voucherId,
            @RequestBody VoucherRequest voucherRequest
    ) {
        return voucherService.updateVoucher(voucherId, voucherRequest);
    }

    @DeleteMapping("/delete/{voucherId}")
    public VoucherResponse deleteVoucher(@PathVariable Long voucherId) {
        return voucherService.deleteVoucher(voucherId);
    }
}
