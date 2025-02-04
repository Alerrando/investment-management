import subprocess

def verifyFile():
    aux = subprocess.run(['git', 'status', '-s'], stdout=subprocess.PIPE)
    return aux.stdout.decode('utf-8').splitlines()


def commit(change):
    commit_message = ""
    add = [file for file in change if file.startswith('??')]
    change = [file for file in change if file.startswith(' M')]
    
    if(add):
        commit_message += f"feat: add"
        for index, file in enumerate(add):
            commit_message += f"{file.split('??')[1]}"
            
            if(index < len(add) - 1):
                commit_message += ","
        commit_message += "\n"
        
    if(change):
        commit_message += f"chang: changing"
        for index, file in enumerate(change):
            commit_message += f"{file.split(' M')[1].split("/")}"
            
            if(index < len(change) - 1):
                commit_message += ","
        commit_message += "\n"
    
    print(commit_message)
    subprocess.run(['git', 'add', '-A'], stdout=subprocess.PIPE)
    subprocess.run(['git', 'commit', '-m', commit_message], stdout=subprocess.PIPE)
    
    
    
a = verifyFile()

if(a):
    commit(a)