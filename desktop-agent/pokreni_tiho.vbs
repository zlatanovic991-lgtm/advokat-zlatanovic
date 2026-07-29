Set objShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)
objShell.CurrentDirectory = scriptDir

' Koristi direktnu putanju do pravog Python-a (ne Microsoft Store "alias",
' koji ume da ne radi kad se pokrece tiho/u pozadini preko Startup foldera).
pythonwPath = objShell.ExpandEnvironmentStrings("%LOCALAPPDATA%") & "\Python\bin\pythonw.exe"

If fso.FileExists(pythonwPath) Then
    objShell.Run """" & pythonwPath & """ """ & scriptDir & "\organize_documents.py""", 0, False
Else
    objShell.Run "pythonw.exe """ & scriptDir & "\organize_documents.py""", 0, False
End If
