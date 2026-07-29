Set objShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)
objShell.CurrentDirectory = scriptDir
objShell.Run "pythonw.exe """ & scriptDir & "\organize_documents.py""", 0, False
