"""
EMS Component & Governance Pytest Suite
Verifies touch target standards, prefers-reduced-motion media queries, and audit invariants.
"""
import pathlib
import pytest

REPO_ROOT = pathlib.Path(__file__).parent.parent.resolve()
EMS_SRC = REPO_ROOT / "EMS" / "src"

def test_ems_index_css_reduced_motion():
    index_css = EMS_SRC / "index.css"
    assert index_css.exists(), "EMS index.css must exist"
    content = index_css.read_text(encoding="utf-8")
    assert "prefers-reduced-motion" in content, "EMS index.css must contain prefers-reduced-motion media query"

def test_ems_touch_targets():
    login_page = EMS_SRC / "components" / "LoginPage.tsx"
    assert login_page.exists(), "LoginPage.tsx must exist"
    content = login_page.read_text(encoding="utf-8")
    assert "min-h-[44px]" in content, "LoginPage buttons must enforce min-h-[44px] touch target area"

def test_ems_self_host_purge_confirmation_guard():
    modal = EMS_SRC / "components" / "SelfHostProvisioningModal.tsx"
    assert modal.exists(), "SelfHostProvisioningModal.tsx must exist"
    content = modal.read_text(encoding="utf-8")
    assert 'Type "PURGE" to confirm' in content, "Purge trigger must enforce 2-step typed confirmation guard"
