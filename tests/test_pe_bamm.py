import pytest
from starlette.testclient import TestClient
import sys
import os

# Add backend directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from server import app
from brain_lab import brain_lab_singleton as brain_lab

client = TestClient(app)

def test_photo_verified_targets_parity():
    """Verify all 8 tickers from photo IMG_6342.jpeg match exact prices and % changes."""
    expected = {
        "IACO": (9.99, 0.00),
        "HIVE": (3.41, 9.65),
        "GLOO": (4.88, -0.61),
        "FATN": (5.73, 1.78),
        "FAC":  (6.25, 10.62),
        "FEAM": (2.50, 21.36),
        "DC":   (6.12, 0.66),
        "FISN": (8.47, 4.31)
    }
    for sym, (price, chg) in expected.items():
        assert sym in brain_lab.entity_registry, f"Missing {sym} in entity_registry"
        target = brain_lab.entity_registry[sym]
        assert target["base_price"] == price, f"{sym} price mismatch: expected {price}, got {target['base_price']}"
        assert target["change_pct"] == chg, f"{sym} change mismatch: expected {chg}, got {target['change_pct']}"
        assert target["cik"] != "", f"{sym} missing CIK"
        assert target["cusip"] != "", f"{sym} missing CUSIP"

def test_pe_bamm_matching_feam():
    """Verify PE-BAMM exact twin and beefed runner matching for FEAM."""
    result = brain_lab.find_performance_matched_and_beefed("FEAM", spread=0.025, limit=4)
    assert result["status"] == "PASS"
    assert result["target"]["symbol"] == "FEAM"
    assert result["target"]["change_pct"] == 21.36

    # Twins must have delta within spread * 100 (2.5%)
    twins = result["exact_performance_twins"]
    assert len(twins) > 0
    for t in twins:
        assert t["performance_delta"] <= 2.5, f"Twin {t['symbol']} delta {t['performance_delta']} exceeds 2.5%"

    # Beefed runners must outperform
    beefed = result["beefed_runners"]
    assert len(beefed) > 0
    for b in beefed:
        assert b["change_pct"] >= 21.36 or b["score"] >= result["target"]["score"]

def test_pe_bamm_all_eight_photo_tickers():
    """Test PE-BAMM for all 8 photo tickers to ensure each generates valid twins & beefed matches."""
    photo_tickers = ["IACO", "HIVE", "GLOO", "FATN", "FAC", "FEAM", "DC", "FISN"]
    for sym in photo_tickers:
        res = brain_lab.find_performance_matched_and_beefed(sym, spread=0.025, limit=4)
        assert res["status"] == "PASS", f"Failed status on {sym}"
        assert res["target"]["symbol"] == sym, f"Mismatched target {sym}"
        assert isinstance(res["exact_performance_twins"], list)
        assert isinstance(res["beefed_runners"], list)
        assert len(res["exact_performance_twins"]) > 0, f"Expected twins for {sym}"
        assert len(res["beefed_runners"]) > 0, f"Expected beefed runners for {sym}"

def test_pe_bamm_api_get():
    """Verify GET /api/brain-lab/performance-match endpoint."""
    resp = client.get("/api/brain-lab/performance-match?symbol=HIVE&spread=0.025&limit=3")
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "PASS"
    assert data["target"]["symbol"] == "HIVE"
    assert data["target"]["price"] == 3.41
    assert "exact_performance_twins" in data
    assert "beefed_runners" in data

def test_pe_bamm_api_post():
    """Verify POST /api/brain-lab/performance-match endpoint."""
    resp = client.post("/api/brain-lab/performance-match", json={"symbol": "FAC", "spread": 0.025, "limit": 4})
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "PASS"
    assert data["target"]["symbol"] == "FAC"
    assert data["target"]["price"] == 6.25

def test_api_health():
    """Verify /api/health endpoint returns status ok."""
    resp = client.get("/api/health")
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "ok"
