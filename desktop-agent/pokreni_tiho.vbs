Set objShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

' Fiksna putanja do foldera sa agentom (radi ispravno bez obzira odakle se
' ovaj .vbs fajl pokrene - npr. i kad je kopiran u Startup folder).
scriptDir = "C:\Users\Vladimir\OneDrive\Desktop\Agenti\DESKTOP"
scriptPath = scriptDir & "\organize_documents.py"

objShell.CurrentDirectory = scriptDir

' Koristi direktnu putanju do pravog Python-a (ne Microsoft Store "alias",
' koji ume da ne radi kad se pokrece tiho/u pozadini preko Startup foldera).
pythonwPath = objShell.ExpandEnvironmentStrings("%LOCALAPPDATA%") & "\Python\bin\pythonw.exe"

If Not fso.FileExists(pythonwPath) Then
    pythonwPath = "pythonw.exe"
End If

objShell.Run """" & pythonwPath & """ """ & scriptPath & """", 0, False
