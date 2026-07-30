@echo off
chcp 65001 >nul
title Dokument agent - sortiranje dokumenata

echo.
echo ============================================================
echo  Dokument agent - sortiranje dokumenata sa Desktopa
echo ============================================================
echo.
echo Napomena: potreban je pokrenut Ollama (ollama serve) i preuzet
echo model (npr. "ollama pull qwen3.6"), kao i instaliran Tesseract OCR
echo (https://github.com/UB-Mannheim/tesseract/wiki) za skenirane
echo dokumente i slike.
echo.

echo Proveravam zavisnosti...
pip install pymupdf python-docx pytesseract pillow -q

python "%~dp0dokument_agent.py"

echo.
pause
