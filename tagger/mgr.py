import tagger.config
import MySQLdb
import warnings
import os

class Mgr:
	def __init__(self):
		# remove mysql warnings...
		if tagger.config.ns_mgr.p_suppress_warnings:
			warnings.filterwarnings('ignore', category = MySQLdb.Warning)
	""" helpers """
	def connect(self):
		return MySQLdb.connect(
			db=tagger.config.ns_db.p_db,
			host=tagger.config.ns_db.p_host,
			port=tagger.config.ns_db.p_port,
			user=tagger.config.ns_db.p_user,
			passwd=tagger.config.ns_db.p_password,
		)
	def get_row(self,connection,query):
		cr=connection.cursor()
		cr.execute(query)
		row=cr.fetchone()
		cr.close()
		return row
	""" Run the given query, commit changes """
	def execute(self,connection,stmt):
		cr=connection.cursor()
		num_affected_rows=cr.execute(stmt)
		cr.close()
		connection.commit()
		return num_affected_rows
	def error(self,msg):
		raise ValueError(msg)
	# find the id of a file named name in folder with db id id
	def find_id_in_folder(self,conn,id,name,curname):
		query="""
			SELECT f_id from TbFile WHERE f_name="%s" AND f_parent=%d
		""" % (name,id)
		row=self.get_row(conn,query)
		if row is None:
			raise ValueError('cannot find folder '+name+' in '+curname)
		else:
			return row['f_id']
	""" ops that can be launched from the command line """
	def showconfig(self):
		tagger.config.show()
	def testconnect(self):
		with self.connect():
			pass
	def create(self):
		conn=self.connect()
		with conn:
			if tagger.config.ns_op.p_force:
				self.execute(conn,'DROP TABLE IF EXISTS TbFileTag');
				self.execute(conn,'DROP TABLE IF EXISTS TbFile');
				self.execute(conn,'DROP TABLE IF EXISTS TbTagRelations');
				self.execute(conn,'DROP TABLE IF EXISTS TbTag');
			self.execute(conn,"""
				CREATE TABLE TbTag (
					f_id INT NOT NULL AUTO_INCREMENT,
					f_name VARCHAR(40) NOT NULL,
					f_description VARCHAR(256) NOT NULL,
					PRIMARY KEY(f_id),
					UNIQUE KEY f_name (f_name)
				) ENGINE=InnoDB
			""")
			self.execute(conn,"""
				CREATE TABLE TbTagRelations (
					f_parent_tag INT NOT NULL,
					f_child_tag INT NOT NULL,
					KEY f_parent_tag (f_parent_tag),
					KEY f_child_tag (f_child_tag),
					CONSTRAINT FOREIGN KEY(f_parent_tag) REFERENCES TbTag(f_id),
					CONSTRAINT FOREIGN KEY(f_child_tag) REFERENCES TbTag(f_id)
				) ENGINE=InnoDB
			""")
			self.execute(conn,"""
				CREATE TABLE TbFile (
					f_id INT NOT NULL AUTO_INCREMENT,
					f_name VARCHAR(256) NOT NULL,
					f_mtime DATETIME NOT NULL,
					f_parent INT NOT NULL,
					PRIMARY KEY(f_id),
					UNIQUE KEY f_name_id (f_id,f_name),
					KEY f_parent (f_parent),
					CONSTRAINT FOREIGN KEY(f_parent) REFERENCES TbFile(f_id)
				) ENGINE=InnoDB
			""")
			self.execute(conn,"""
				CREATE TABLE TbFileTag (
					f_file INT NOT NULL,
					f_tag INT NOT NULL,
				KEY f_file (f_file),
				KEY f_tag (f_tag),
				CONSTRAINT FOREIGN KEY(f_file) REFERENCES TbFile(f_id),
				CONSTRAINT FOREIGN KEY(f_tag) REFERENCES TbTag(f_id)
				) ENGINE=InnoDB
			""")
			#self.execute(conn,"""
			#	INSERT INTO TbFile (f_name,f_mtime,f_parent) VALUES("%s",FROM_UNIXTIME(%s),%s)
			#	""" % ('/',os.path.getmtime('/'),1)
			#)
	def scan(self):
		directory=tagger.config.ns_mgr.p_dir
		# now add the directory if it's not there...
	def search(self):
		conn=self.connect()
		with conn:
			directory=tagger.config.ns_mgr.p_dir
			if not os.path.isdir(directory):
				self.error(directory+' is not a directory')
			# turn the folder into absolute path
			directory=os.path.abspath(directory)
			# id of the root
			id=1
			curname='/'
			for comp in directory.split('/')[1:]:
				id=self.find_id_in_folder(conn,id,comp,curname)
				curname=comp
	def taglist(self):
		conn=self.connect()
		with conn:
			cr=conn.cursor()
			cr.execute('SELECT f_name from TbTag')
			while True:
				row=cr.fetchone()
				if row is None:
					break
				print row[0]
			cr.close()
	def raiseexception(self):
		raise ValueError('this is the exception message')
	def insertdir(self):
		conn=self.connect()
		with conn:
			pass
	def clean(self):
		if not tagger.config.ns_op.p_force:
			raise ValueError('must pass --force')
		conn=self.connect()
		with conn:
			self.execute(conn,'DELETE FROM TbFileTag');
			self.execute(conn,'DELETE FROM TbFile');
			self.execute(conn,'DELETE FROM TbTagRelations');
			self.execute(conn,'DELETE FROM TbTag');
